const qnaModel = require('../models/admanageqnamodel')


module.exports = {

  /**
   * @author 권준일
   * @description 전체 qna 보기 
   */
   qnaList: async (pageNum) => {
      
      return await qnaModel.qnaList((pageNum-1)*15, (pageNum-1)*15+15)
      

  },


   /**
   * @author 권준일
   * @description 답변한 qna 보기
   */
    answerQnaList: async (pageNum) => {
       
      return await qnaModel.answerQnaList((pageNum-1)*15, (pageNum-1)*15+15);
 },

  /**
   * @author 권준일
   * @description 답변 안 한 qna 보기
   */
   dontAnswerQnaList: async (pageNum) => {
       
    return await qnaModel.dontAnswerQnaList((pageNum-1)*15, (pageNum-1)*15+15);
},


 /**
   * @author 권준일
   * @description qna 답변하기
   */
  answerQna: async (req) => {
       
    return await qnaModel.answerQna(req.body.response, req.session.adId, req.body.id);
},



 /**
   * @author 권준일
   * @description qna 답변 수정
   */
  reviseQna: async (req) => {
       
    return await qnaModel.reviseQna(req.body.response, req.session.adId, req.body.id);
},


 
  

}