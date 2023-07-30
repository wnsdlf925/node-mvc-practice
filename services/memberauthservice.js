//MARK: - Modules
const jwtMiddleware = require('../middlewares/jwtmiddleware')
const memberAuthModel = require('../models/memberauthmodel')

//MARK: - Exports Business Logic
module.exports = {
    /**
     * @author 이영재
     * @description Social sign-up Service
     */
    signUp: async (req) => {
        console.log("-----Member Sign-up Service.-----")
        //nickName 중복 검사
        const isExistsNickName = await memberAuthModel.findByNickName(req.body.nickName)
        if (isExistsNickName.status === 400) return isExistsNickName

        if (isExistsNickName.payload.length === 0) {
            const isSecede = req.body.secedeFlag
            const accessToken = await jwtMiddleware.getAccessToken(req.body.email)
            const refreshToken = await jwtMiddleware.getRefreshToken()
            let returnStatus, returnPayload

            if (isSecede === 1) {
                const secedeMemberSignUpResponse = await memberAuthModel.secedeMemberSignUp(req)
                if (secedeMemberSignUpResponse.status === 400) return secedeMemberSignUpResponse

                const updateRefreshToken = await memberAuthModel.updateRefreshToken(req.body.memberId, refreshToken)
                if (updateRefreshToken.status === 400) return updateRefreshToken

                const updateMemberLog = await memberAuthModel.updateSecedeMemberLog(req.body.memberId, req)
                if (updateMemberLog.status === 400) return updateMemberLog

                returnStatus = secedeMemberSignUpResponse.status
                returnPayload = secedeMemberSignUpResponse.payload
            } else {
                const signUpResponse = await memberAuthModel.signUp(req)
                if (signUpResponse.status === 400) return signUpResponse

                const insertMemberId = signUpResponse.payload[0].insertId

                const setRefreshToken = await memberAuthModel.insertRefreshToken(insertMemberId, refreshToken)
                if (setRefreshToken.status === 400) return setRefreshToken

                const setMemberLog = await memberAuthModel.insertMemberLog(insertMemberId, req)
                if (setMemberLog.status === 400) return setMemberLog

                returnStatus = signUpResponse.status
                returnPayload = signUpResponse.payload
            }

            return new Promise(resolve => {
                resolve(
                    {
                        status: returnStatus,
                        payload: returnPayload,
                        data: {accessToken, refreshToken}
                    }
                )
            })
        } else {
            return new Promise(resolve => {
                resolve({
                    status: 201,
                    payload: "Already NickName."
                })
            })
        }
    },

    /**
     * @author 이영재
     * @description Social sign-in Service
     */
    signIn: async (req) => {
        console.log("-----Member Sign-in Service.-----")
        //로그아웃 후 로그인 시 서버 DataBase에 회원 정보가 없으면 회원 가입이므로(소셜 로그인을 통해 로그인 하므로)
        //301 반환, Front-end 에서는 소셜 로그인 요청 결과 값인 기본 닉네임 값을 가지고 닉네임 입력 화면 띄우기
        const isExistsMember = await memberAuthModel.searchMember(req.body.socialId)
        if (isExistsMember.payload.length === 0) {
            return new Promise(resolve => {
                resolve({
                    status: 301,
                    payload: "Need nick name."
                })
            })
        } else {
            const memberId = isExistsMember.payload[0].id
            const memberEmail = isExistsMember.payload[0].email

            //TODO 탈퇴면 다시 재가입.(프론트에서 302면 signUp API의 request body로 secedeFlag값을 1로 응답으로 넘어온 memberId와 같이 보내주고 아니면 0으로 보내줄 것.)
            const isSecede = await memberAuthModel.isSecedeMember(req.body.socialId)
            if (isSecede.payload[0].secede === 1) {
                return new Promise(resolve => {
                    resolve({
                        status: 302,
                        payload: memberId
                    })
                })
            } else {
                //TODO 정지된 회원이면 로그아웃 처리(프론트에서 logout API 호출)
                const isBan = await memberAuthModel.isBanMember(req.body.socialId)
                if (isBan.payload[0].ban === 1) {
                    return new Promise(resolve => {
                        resolve({
                            status: 401,
                            payload: "Ban Member."
                        })
                    })
                } else {
                    //이미 가입 되어 있는 회원(DataBase에 회원 정보가 있는 경우)이면, 다시 로그인 하는 것이므로
                    //jwt(access Token + Refresh Token) token을 발급해서 Client에게 보내줌
                    const accessToken = await jwtMiddleware.getAccessToken(memberEmail)
                    const refreshToken = await jwtMiddleware.getRefreshToken()

                    const insertRefreshToken = await memberAuthModel.insertRefreshToken(memberId, refreshToken)
                    if (insertRefreshToken.status === 400) return insertRefreshToken

                    const updateMemberLog = await memberAuthModel.updateMemberLog(memberId, req)
                    if (updateMemberLog.status === 400) return updateMemberLog

                    return new Promise(resolve => {
                        resolve(
                            {
                                status: 200,
                                payload: 'Success sign-in.',
                                data: {accessToken, refreshToken}
                            }
                        )
                    })
                }
            }
        }
    },

    /**
     * @author 이영재
     * @description Token Authentication(인증) Service
     */
    authentication: async (req) => {
        console.log("-----Member Authentication Service.-----")
        const decodedAccessToken = await jwtMiddleware.verifyAccessToken(req).catch()
        //refresh token 기반으로 id 가져오기(Indexing)
        const refreshToken = req.body.refreshToken
        const getMemberId = await memberAuthModel.findByToken(refreshToken)
        //일치하는 refresh token 없을 경우 예외 처리
        if (getMemberId.payload.length === 0) return new Promise(resolve => {
            resolve({
                status: 400,
                payload: "Access Denied."
            })
        })

        const memberId = getMemberId.payload[0].memberId
        const memberNickName = getMemberId.payload[0].nickName

        const isExistsMember = await memberAuthModel.findById(memberId)
        if (isExistsMember.status === 400) return isExistsMember
        const memberSocialId = isExistsMember.payload[0].socialId

        const isBan = await memberAuthModel.isBanMember(memberSocialId)
        //TODO 정지된 회원이면 로그아웃 처리(프론트에서 logout API 호출)
        if (isBan.payload[0].ban === 1) {
            return new Promise(resolve => {
                resolve({
                    status: 401,
                    payload: "Ban Member."
                })
            })
        } else {
            if (decodedAccessToken.status === 400) {
                //access token expired -> verify refresh token
                if (decodedAccessToken.message.message === "jwt expired") {
                    const getEmail = await memberAuthModel.findById(memberId)
                    //일치하는 email 없을 경우 예외 처리
                    if (getEmail.payload.length === 0) return new Promise(resolve => {
                        resolve({
                            status: 400,
                            payload: "Access Denied."
                        })
                    })
                    const email = getEmail.payload[0].email

                    const decodedRefreshToken = await jwtMiddleware.verifyRefreshToken(refreshToken).catch()
                    if (decodedRefreshToken.status === 400) {
                        //access token expired and refresh token expired. -> Search DataBase and update refresh token.
                        if (decodedRefreshToken.message.message === "jwt expired") {
                            //MARK: - sliding sessions method : access token, refresh token 재발급 후 refresh token update 후 response
                            const accessToken = await jwtMiddleware.getAccessToken(email)
                            const refreshToken = await jwtMiddleware.getRefreshToken()

                            const updateRefreshToken = await memberAuthModel.updateRefreshToken(memberId, refreshToken)
                            //update error 발생 하면 에러 return
                            if (updateRefreshToken.status === 400) return updateRefreshToken

                            return new Promise(resolve => {
                                resolve({
                                    status: 200,
                                    payload: {
                                        "memberId" : memberId,
                                        "nickName" : memberNickName
                                    },
                                    data: {accessToken, refreshToken}
                                })
                            })
                        }
                        return decodedRefreshToken
                    }
                    //정상적인 refresh token 인 경우, access token 재발급 후 response 보내기
                    const accessToken = await jwtMiddleware.getAccessToken(email)
                    return new Promise(resolve => {
                        resolve({
                            status: 200,
                            payload: {
                                "memberId" : memberId,
                                "nickName" : memberNickName
                            },
                            data: {accessToken}
                        })
                    })
                }
                return decodedAccessToken
            }

            //정상적인 access token
            return new Promise(resolve => {
                resolve({
                    status: 200,
                    payload: {
                        "memberId" : memberId,
                        "nickName" : memberNickName
                    },
                })
            })
        }
    },

    /**
     * @author 이영재
     * @description Sign-out Service
     */
    signOut: async (req) => {
        console.log("-----Member Sign-out Service.-----")

        const refreshToken = req.body.refreshToken
        if (refreshToken === null || refreshToken === undefined || refreshToken === "" || refreshToken.length === 0) return new Promise(resolve => {
            resolve({
                status: 400,
                payload: "Invalid request."
            })
        })

        //request로 넘어온 refresh token이 Database에 없을 경우 예외 처리.
        const getMemberId = await memberAuthModel.findByToken(refreshToken)
        if (getMemberId.payload.length === 0) return new Promise(resolve => {
            resolve({
                status: 400,
                payload: "Access Denied."
            })
        })
        const memberId = getMemberId.payload[0].memberId

        return await memberAuthModel.signOut(memberId)
    }
}