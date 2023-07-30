//MARK: - Modules
const express = require('express');
const router = express.Router();

const mypageController = require('../controllers/mypagecontroller')

//MARK: - Routers
/**
 * @author 오기용
 * @description 프로필 불러오기(닉네임, 사진, 모닥불 개수, 랭킹)
 */
router.get('/profile', mypageController.profile);

/**
 * @author 오기용
 * @description 프로필 수정
 */
router.put('/update', mypageController.update);

/**
 * @author 오기용
 * @description 로그아웃
 */

/**
 * @author 오기용
 * @description 회원탈퇴
 */
router.put('/secede', mypageController.secede);

/**
 * @author 오기용
 * @description 캠핑존 찜한 캠핑장 목록 불러오기
 */
router.get('/mycampingzone', mypageController.mycampingzone);

/**
 * @author 오기용
 * @description 체크리스트 불러오기
 */
router.get('/checklist', mypageController.checkList);

/**
 * @author 오기용
 * @description 체크리스트 편집(추가, 삭제)
 */
router.post('/checklist', mypageController.editCheckList);


/**
 * @author 오기용
 * @description 내가 쓴 게시물 목록 불러오기
 */
router.get('/myboard', mypageController.myBoardList);


/**
 * @author 오기용
 * @description 내가 쓴 게시물 상세 보기
 */
router.get('/myboard/:id', mypageController.myBoardDetail);


/**
 * @author 오기용
 * @description 내가 댓글 단 게시물 목록 불러오기
 */
router.get('/mycomment', mypageController.myCommentList);


/**
 * @author 오기용
 * @description 내가 모닥불을 준 게시물 목록 불러오기
 */
router.get('/givefire', mypageController.giveFireList);


/**
 * @author 오기용
 * @description FAQ 목록 불러오기
 */
router.get('/faq', mypageController.faqList);


/**
 * @author 오기용
 * @description FAQ 상세 보기
 */
router.get('/faq/:id', mypageController.faqDetail);


/**
 * @author 오기용
 * @description 내가 한 질문 목록 불러오기
 */
router.get('/qna', mypageController.qnaList);


/**
 * @author 오기용
 * @description 내가 한 질문 상세 보기
 */
router.get('/qna/:id', mypageController.qnaDetail);

//MARK: - Exports
module.exports = router;

