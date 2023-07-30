const qnaService = require('../services/manageqnaservice')



module.exports = {

   /**
     * @author 권준일
     * @description 전체 qna 보기 
     */
    qnaList: async (req, res, next) => {

      res.send(await qnaService.qnaList(req.body.pageNum))
  },


  /**
   * @author 권준일
   * @description 답변한 qna 보기
   */
   answerQnaList: async (req, res, next) => {

      res.send(await qnaService.answerQnaList(req.body.pageNum))
  },

  /**
   * @author 권준일
   * @description 답변 안 한 qna 보기
   */
   dontAnswerQnaList: async (req, res, next) => {

      res.send(await qnaService.dontAnswerQnaList(req.body.pageNum))
  },



   /**
   * @author 권준일
   * @description qna 답변하기
   */
    answerQna: async (req, res, next) => {

      res.send(await qnaService.answerQna(req))
  },



   /**
   * @author 권준일
   * @description qna 답변 수정
   */
    reviseQna: async (req, res, next) => {

      res.send(await qnaService.reviseQna(req))
  }

}