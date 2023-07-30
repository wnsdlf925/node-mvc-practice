//MARK: - Modules
const express = require('express')
const router = express.Router()
const memberAuthController = require('../controllers/memberauthcontroller')

//MARK: - Routers
//http://{IP}:{PORT}/auth/...
/**
 * @author 이영재
 * @description Social sign-up router
 */
router.post('/sign-up', memberAuthController.signUp)

/**
 * @author 이영재
 * @description Social sign-in router
 */
router.post('/sign-in', memberAuthController.signIn)

/**
 * @author 이영재
 * @description Token authentication(인증) router
 */
router.post('/', memberAuthController.authentication)

/**
 * @author 이영재
 * @description Sign-out router
 */
router.post('/sign-out', memberAuthController.signOut)

//MARK: - Exports
module.exports = router