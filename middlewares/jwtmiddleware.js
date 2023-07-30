//MARK: - Modules
const jwt = require('jsonwebtoken')

require('dotenv').config()

//MARK: - Exports
module.exports = {
    /**
     * @author 이영재
     * @description jwt access token 발급
     */
    getAccessToken: async (email) => {
        console.log("-----Get access token.-----")
        return new Promise(resolve => {
            resolve(jwt.sign(
                {email: email},
                process.env.JWT_ACCESS_SECRET_KEY,
                {expiresIn: "30m", issuer: "campers_lyj"}
            ))
        })
    },

    /**
     * @author 이영재
     * @description jwt refresh token 발급
     */
    getRefreshToken: async () => {
        console.log("-----Get refresh token.-----")
        return new Promise(resolve => {
            resolve(jwt.sign(
                {},
                process.env.JWT_REFRESH_SECRET_KEY,
                {expiresIn: "30d", issuer: "campers_lyj"}
            ))
        })
    },

    /**
     * @author 이영재
     * @description jwt access token 검증
     */
    verifyAccessToken: async (req) => {
        console.log("-----Verify Access Token.-----")
        return new Promise((resolve) => {
            try {
                const token = req.headers.authorization.split(' ')[1]
                const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY)
                req.email = decoded.email
                resolve(decoded)
            } catch (error) {
                resolve({
                    status: 400,
                    payload: "Invalid Token.",
                    message: error
                })
            }
        })
    },

    /**
     * @author 이영재
     * @description jwt refresh token 검증
     */
    verifyRefreshToken: async (refreshToken) => {
        console.log("-----Verify Refresh Token.-----")
        const token = refreshToken
        if (token === null || token === undefined || token === "" || token.length === 0) return new Promise(resolve => {
            resolve({
                status: 400,
                payload: "Invalid request."
            })
        })

        return new Promise(resolve => {
            try {
                const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY)
                resolve(decoded)
            } catch (error) {
                resolve({
                    status: 400,
                    payload: "Invalid Token.",
                    message: error
                })
            }
        })
    },
}