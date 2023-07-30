//MARK: - Modules
const express = require('express')
const router = express.Router()
const fireController = require('../controllers/firecontroller')

//MARK: - Routers
//http://{IP}:{PORT}/fire/...
/**
 * @author 이영재
 * @swagger
 *  /fire/announcement:
 *    get:
 *      tags:
 *       - 공지사항
 *      description: 공지사항 1개 가져오기
 *      produces:
 *       - application/json
 *      responses:
 *       200:
 *        description: "성공 { status: 200, payload: {} }"
 *       400:
 *        description: "실패 { status: 400, payload: {} }"
 */
router.get('/announcement', fireController.getAnnouncement)

/**
 * @author 이영재
 * @swagger
 *  /fire/announcement/list:
 *    get:
 *      tags:
 *      - 공지사항
 *      description: 공지사항 리스트 가져오기
 *      produces:
 *      - application/json
 *      responses:
 *       200:
 *        description: "성공 { status: 200, payload: {} }"
 *       400:
 *        description: "실패 { status: 400, payload: {} }"
 */
router.get('/announcement/list', fireController.getAnnouncementList)

/**
 * @author 이영재
 * @description 공지사항 상세 조회
 */
router.get('/announcement/:id', fireController.getAnnouncementDetail)

/**
 * @author 이영재
 * @description 칼럼 1개 가져오기
 */
router.get('/column', fireController.getColumn)

/**
 * @author 이영재
 * @description 칼럼 리스트 가져오기
 */
router.get('/column/list', fireController.getColumnList)

/**
 * @author 이영재
 * @description 칼럼 상세 조회
 */
router.get('/column/:id', fireController.getColumnDetail)

/**
 * @author 이영재
 * @description 기본 게시판 15개
 */
router.get('/default', fireController.getDefaultBoard)

/**
 * @author 이영재
 * @description 기본 게시판 목록
 */
router.get('/default/list', fireController.getDefaultBoardList)

/**
 * @author 이영재
 * @description 기본 게시판 게시물 목록
 */
router.get('/default/content/list/:id', fireController.getDefaultBoardContentsList)

/**
 * @author 이영재
 * @description 기본 게시판 게시물 상세 내용
 */
router.get('/default/content/detail/:id', fireController.getDefaultBoardContentsDetail)

/**
 * @author 이영재
 * @description 기본 게시판 검색
 */
router.get('/default/search', fireController.searchDefaultBoard)

/**
 * @author 이영재
 * @description 사용자 게시판 15개
 */
router.get('/member', fireController.getMemberBoard)

/**
 * @author 이영재
 * @description 사용자 게시판 목록
 */
router.get('/member/list', fireController.getMemberBoardList)

/**
 * @author 이영재
 * @description 사용자 게시판 게시물 목록
 */
router.get('/member/content/list/:id', fireController.getMemberBoardContentsList)

/**
 * @author 이영재
 * @description 사용자 게시판 게시물 상세 내용
 */
router.get('/member/content/detail/:id', fireController.getMemberBoardContentsDetail)

/**
 * @author 이영재
 * @description 사용자 게시판 검색
 */
router.get('/member/search', fireController.searchMemberBoard)

/**
 * @author 이영재
 * @description 기본게시판 게시물 검색
 */
router.get('/default/content/search', fireController.searchDefaultBoardContents)

/**
 * @author 이영재
 * @description 사용자 게시판 게시물 검색
 */
router.get('/member/content/search', fireController.searchMemberBoardContents)

/**
 * @author 이영재
 * @description 사용자 게시판 만들기
 */
router.post('/member', fireController.createMemberBoard)

/**
 * @author 이영재
 * @description 사용자 게시판 게시물 글쓰기
 */
router.post('/member/content', fireController.createMemberBoardContents)

//MARK: - Exports
module.exports = router