//MARK: - Modules
const express = require('express')
const router = express.Router()
const homeController = require('../controllers/homecontroller')

//MARK: - Routers
//http://{IP}:{PORT}/home/...
/**
 * @author 이영재
 * @description Best Camper 상위 5명 조회
 */
router.get('/best-camper', homeController.bestCamper)

/**
 * @author 이영재
 * @description Best Camper 리스트 조회
 */
router.get('/best-camper/list', homeController.bestCamperList)

/**
 * @author 이영재
 * @description 최근 핫 게시물 상위 5개 조회
 */
router.get('/hot-contents', homeController.hotContents)

/**
 * @author 이영재
 * @description 핫 게시물 리스트 조회
 */
router.get('/hot-contents/list', homeController.hotContentsList)

/**
 * @author 이영재
 * @description 핫 게시물 상세 내용 조회
 */
router.get('/hot-contents/:type/:id', homeController.hotContentsDetail)

/**
 * @author 이영재
 * @description 내가 올린 게시물 최근 5개 조회
 */
router.post('/my-contents', homeController.myContents)

//MARK: - Exports
module.exports = router