//MARK: - Modules
const {dbTransactionConnection, dbConnection} = require("../config/mysqlconfig")
const publicIp = require('public-ip')

//MARK: - Exports
module.exports = {
    /**
     * @author 이영재
     * @description 중복 회원 검사 model
     */
    searchMember: async (socialId) => {
        console.log("-----Search Member Email Model.-----")
        let searchMemberSql = 'SELECT id, email FROM member WHERE socialId = ?;'
        let searchMemberParams = [socialId]
        return await dbConnection(searchMemberSql, searchMemberParams)
    },

    /**
     * @author 이영재
     * @description Social 로그인 시 서버 DataBase에 회원 정보가 없으면, DataBase에 등록
     */
    signUp: async (req) => {
        console.log("-----Member Sign-up Model.-----")
        let selectMaxRankSql = "SELECT MAX(`rank`) as value from member;"
        let selectMaxRankParams = []
        const getMaxRank = await dbConnection(selectMaxRankSql, selectMaxRankParams)
        if (getMaxRank.status === 400) return getMaxRank
        else {
            const rank = getMaxRank.payload[0].value + 1

            let memberSignUpSql = 'INSERT INTO member(socialId, email, socialPlatform, nickName, `rank`) VALUES(?, ?, ?, ?, ?); SELECT LAST_INSERT_ID();'
            let memberSignUpParams = [req.body.socialId, req.body.email, req.body.socialPlatform, req.body.nickName, rank]
            return await dbTransactionConnection(memberSignUpSql, memberSignUpParams)
        }
    },

    /**
     * @author 이영재
     * @description 탈퇴한 회원 재가입
     */
    secedeMemberSignUp: async (req) => {
        console.log("-----Secede Member Sign-up Model.-----")
        let selectMaxRankSql = "SELECT MAX(`rank`) as value from member;"
        let selectMaxRankParams = []
        const getMaxRank = await dbConnection(selectMaxRankSql, selectMaxRankParams)
        if (getMaxRank.status === 400) return getMaxRank
        else {
            const rank = getMaxRank.payload[0].value + 1

            let secedeMemberSignUpSql = "UPDATE member SET socialId = ?, email = ?, socialPlatform = ?, nickName = ?, `rank` = ?, secede = ? WHERE id = ?;"
            let secedeMemberSignUpParams = [req.body.socialId, req.body.email, req.body.socialPlatform, req.body.nickName, rank, 0, req.body.memberId]
            return await dbTransactionConnection(secedeMemberSignUpSql, secedeMemberSignUpParams)
        }
    },

    /**
     * @author 이영재
     * @description Insert Refresh Token
     */
    insertRefreshToken: async (id, token) => {
        console.log("-----Member Insert Refresh Token Model.-----")
        let insertRefreshTokenSql = "INSERT INTO memberRefreshToken(memberId, refreshToken) VALUES(?, ?);"
        let insertRefreshTokenParams = [id, token]
        return await dbTransactionConnection(insertRefreshTokenSql, insertRefreshTokenParams)
    },

    /**
     * @author 이영재
     * @description Update Refresh Token
     */
    updateRefreshToken: async (id, token) => {
        console.log("-----Member Update Refresh Token Model.-----")
        let updateRefreshTokenSql = "UPDATE memberRefreshToken SET refreshToken = ? WHERE memberId = ?;"
        let updateRefreshTokenParams = [token, id]
        return await dbTransactionConnection(updateRefreshTokenSql, updateRefreshTokenParams)
    },

    /**
     * @author 이영재
     * @description Insert MemberLog
     */
    insertMemberLog: async (id, req) => {
        console.log("-----Member Insert Log Model.-----")
        let insertMemberLogSql = "INSERT INTO memberLog(memberId, signUpDateTime, latelyLoginDateTime, ip, memberAgent) VALUES(?, ?, ?, ?, ?)"
        let insertMemberLogParams = [id, new Date(), new Date(), await publicIp.v4(), req.headers['user-agent']]
        return await dbTransactionConnection(insertMemberLogSql, insertMemberLogParams)
    },

    /**
     * @author 이영재
     * @description Update MemberLog
     */
    updateMemberLog: async (id, req) => {
        console.log("-----Member Update Log Model.-----")
        let updateMemberLogSql = "UPDATE memberLog SET latelyLoginDateTime = ?, ip = ?, memberAgent = ? WHERE memberId = ?"
        let updateMemberLogParams = [new Date(), await publicIp.v4(), req.headers['user-agent'], id]
        return await dbTransactionConnection(updateMemberLogSql, updateMemberLogParams)
    },

    /**
     * @author 이영재
     * @description Update Secede MemberLog
     */
    updateSecedeMemberLog: async (id, req) => {
        console.log("-----Member Secede Update Log Model.-----")
        let updateMemberLogSql = "UPDATE memberLog SET signUpDateTime = ?, latelyLoginDateTime = ?, ip = ?, memberAgent = ? WHERE memberId = ?"
        let updateMemberLogParams = [new Date(), new Date(), await publicIp.v4(), req.headers['user-agent'], id]
        return await dbTransactionConnection(updateMemberLogSql, updateMemberLogParams)
    },

    /**
     * @author 이영재
     * @description Search memberId in memberRefreshToken Table by refresh token
     */
    findByToken: async (refreshToken) => {
        console.log("-----Find MemberId By Refresh Token Model.-----")
        let searchMemberIdSql = "SELECT mrt.memberId, m.nickName FROM memberRefreshToken mrt, member m WHERE refreshToken = ? and mrt.memberId = m.id;"
        let searchMemberParams = [refreshToken]
        return await dbConnection(searchMemberIdSql, searchMemberParams)
    },

    /**
     * @author 이영재
     * @description Search Member email by id
     */
    findById: async (id) => {
        console.log("-----Find Member Email By Id Model.-----")
        let searchMemberEmailSql = "SELECT email, socialId FROM member where id = ?;"
        let searchMemberEmailParams = [id]
        return await dbConnection(searchMemberEmailSql, searchMemberEmailParams)
    },

    /**
     * @author 이영재
     * @description Search Member by nickName
     */
    findByNickName: async (nickName) => {
        console.log("-----Find Member By NickName Model.-----")
        let searchMemberNickNameSql = "SELECT nickName FROM member where nickName = ?;"
        let searchMemberNickNameParams = [nickName]
        return await dbConnection(searchMemberNickNameSql, searchMemberNickNameParams)
    },

    /**
     * @author 이영재
     * @description Sign-out Model
     */
    signOut: async (memberId) => {
        console.log("-----Member Sign-out Model.-----")
        let deleteRefreshTokenSql = "DELETE FROM memberRefreshToken WHERE memberId = ?;"
        let deleteRefreshTokenParams = [memberId]
        return await dbTransactionConnection(deleteRefreshTokenSql, deleteRefreshTokenParams)
    },

    /**
     * @author 이영재
     * @description 탈퇴여부 검사 Model
     */
    isSecedeMember: async (socialId) => {
        console.log("-----Check Secede Model.-----")
        let isSecedeSql = "SELECT secede FROM member WHERE socialId = ?;"
        let isSecedeParams = [socialId]
        return await dbConnection(isSecedeSql, isSecedeParams)
    },

    /**
     * @author 이영재
     * @description 정지여부 검사 Model
     */
    isBanMember: async (socialId) => {
        console.log("-----Check Ban Model.-----")
        let isBanSql = "SELECT ban FROM member WHERE socialId = ?;"
        let isBanParams = [socialId]
        return await dbConnection(isBanSql, isBanParams)
    },
}