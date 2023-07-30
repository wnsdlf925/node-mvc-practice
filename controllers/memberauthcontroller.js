//MARK: - Modules
const memberAuthService = require('../services/memberauthservice')

//MARK: - Exports
module.exports = {
    /**
     * @author 이영재
     * @description Social sign-up controller
     */
    signUp: async (req, res) => {
        console.log("-----Member Sign-up Controller.-----")
        res.send(await memberAuthService.signUp(req))
    },

    /**
     * @author 이영재
     * @description Social sign-in controller
     */
    signIn: async (req, res) => {
        console.log("-----Member Sign-in Controller.-----")
        res.send(await memberAuthService.signIn(req))
    },

    /**
     * @author 이영재
     * @description Token authentication(인증) Controller
     */
    authentication: async (req, res) => {
        console.log("-----Member Authentication Controller.-----")
        res.send(await memberAuthService.authentication(req))
    },

    /**
     * @author 이영재
     * @description Sign-out Controller
     */
    signOut: async (req, res) => {
        console.log("-----Member Sign-out Controller.-----")
        res.send(await memberAuthService.signOut(req))
    },
}