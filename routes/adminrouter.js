//MARK: - Modules
const express = require('express');
const router = express.Router();
const sess = require('../config/session')
let session = sess.session
router.use(session)

//MARK: - Routers
const adminController = require('../controllers/admincontroller')
const manageBoardController = require('../controllers/manageboardcontroller')
const manageMemberController = require('../controllers/managemembercontroller')
const faqController = require('../controllers/faqcontroller')
const qnaController = require('../controllers/manageqnacontroller')

/**
 * @author 권준일
 * @description 기본 게시판 생성
 */
router.put('/defaultboard', adminController.checkSession,manageBoardController.createDefaultBoard)

/**
 * @author 권준일
 * @description 기본 게시판 출력
 */
 router.get('/defaultboard', adminController.checkSession , manageBoardController.defaultBoardList)

 /**
 * @author 권준일
 * @description 기본 게시판 삭제
 */
  router.delete('/defaultboard', adminController.checkSession , manageBoardController.deleteDefaultBoard)

  /**
 * @author 권준일
 * @description 관리자 로그인
 */
   router.post('/login', async(req,res) => {
    let loginService = await adminController.login(req,res)
    if(loginService.status == 200){
      req.session.AdName = req.body.name
      req.session.AdId = loginService.id
      
      req.session.save(() => {
        delete loginService.id
        res.send(loginService)
        
        })
        
        
    }else{
      delete loginService.id
      res.send(loginService)
    }
    
   })

    /**
 * @author 권준일
 * @description 관리자 가입
 */
     router.post('/signup', adminController.signUp)


       /**
 * @author 권준일
 * @description 관리자 로그아웃
 */
        router.post('/logout', async(req,res) => {
          req.session.destroy(() => {
            logout = {
              status: 200,
              payload: "success"
            }
            
            res.send(logout)
            
            })
        })










/**
 * @author 권준일
 * @description  게시판 목록 이미 만든거 쓰는게?
 */
 router.delete('/defaultboard', adminController.checkSession , manageBoardController.deleteDefaultBoard)



/**
 * @author 권준일
 * @description  게시물 목록 이미 만든거 쓰는게?
 */
 router.delete('/defaultboard', adminController.checkSession , manageBoardController.deleteDefaultBoard)


/**
 * @author 권준일
 * @description  게시물 상세 이미 만든거 쓰는게?
 */
 router.delete('/defaultboard', adminController.checkSession , manageBoardController.deleteDefaultBoard)



/**
 * @author 권준일
 * @description  게시물 삭제 
 */
 router.delete('/manageboard', adminController.checkSession , manageBoardController.deleteBoard)



/**
 * @author 권준일
 * @description 게시물 신고 횟수 조회
 */
 router.get('/managereport', adminController.checkSession , manageBoardController.boardReport)


/**
 * @author 권준일
 * @description 게시물 신고 사유 조회
 */
 router.get('/managereport-reason', adminController.checkSession , manageBoardController.boardReportReason)

        
/**
 * @author 권준일
 * @description 게시물 조회수 조회
 */
 router.get('/manageboardview', adminController.checkSession , manageBoardController.boardView)

     /**
 * @author 권준일
 * @description 첨부파일 다운로드??
 */
 router.post('/downloadboard', adminController.checkSession , manageBoardController.downloadFile)






/**
 * @author 권준일
 * @description 탈퇴한 회원보기
 */
 router.get('/secedemember', adminController.checkSession , manageMemberController.secedeMemberList)



/**
 * @author 권준일
 * @description 정지된 회원보기
 */
 router.get('/banmember', adminController.checkSession , manageMemberController.banMemberList)



/**
 * @author 권준일
 * @description  회원보기
 */
 router.get('/member', adminController.checkSession , manageMemberController.memberList)



/**
 * @author 권준일
 * @description 랭킹조회
 */
 router.get('/memberrank', adminController.checkSession , manageMemberController.memberRank)



/**
 * @author 권준일
 * @description 회원 정지시키기
 */
 router.post('/banmember', adminController.checkSession , manageMemberController.banMember)



 /**
 * @author 권준일
 * @description 회원 탈퇴시키기
 */
  router.post('/secedemember', adminController.checkSession , manageMemberController.secedeMember)




   /**
 * @author 권준일
 * @description FAQ 보기
 */
    router.get('/faq', adminController.checkSession , faqController.faqList)


   /**
 * @author 권준일
 * @description FAQ 생성
 */
    router.put('/faq', adminController.checkSession , faqController.createFaq)


     /**
 * @author 권준일
 * @description FAQ 수정
 */
  router.patch('/faq', adminController.checkSession , faqController.reviseFaq)


   /**
 * @author 권준일
 * @description FAQ 삭제
 */
    router.delete('/faq', adminController.checkSession , faqController.deleteFaq)



     /**상세 필요한가?
 * @author 권준일
 * @description FAQ 상세
 */
      router.post('/faq', adminController.checkSession , faqController.viewFaq)






/**
 * @author 권준일
 * @description 전체 qna 보기 
 */
 router.get('/qna', adminController.checkSession , qnaController.qnaList)


 /**
* @author 권준일
* @description 답변한 qna 보기
*/
  router.get('/qna-answer', adminController.checkSession , qnaController.answerQnaList)


   /**
* @author 권준일
* @description 답변 안 한 qna 보기
*/
router.get('/qna-non-answer', adminController.checkSession , qnaController.dontAnswerQnaList)


 /**
* @author 권준일
* @description qna 답변하기
*/
  router.post('/qna-answer', adminController.checkSession , qnaController.answerQna)



   /**상세 필요한가?
* @author 권준일
* @description qna 답변 수정
*/
    router.patch('/qna', adminController.checkSession , qnaController.reviseQna)


//MARK: - Exports
module.exports = router;