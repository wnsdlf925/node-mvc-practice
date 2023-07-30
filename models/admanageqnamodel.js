//MARK: - Modules
const {dbTransactionConnection, dbConnection} = require("../config/mysqlconfig")

//MARK: - Exports
module.exports = {

  /**
   * @author 권준일
   * @description 전체 qna 보기 
   */
  qnaList: async (pageNum, maxPageNum) => {
      let qnaListSql = "select * from campers_test.qna where isDelete = 0 order by id DESC limit ?, ?;"
      let qnaListParams = [pageNum, maxPageNum];
      return await dbConnection(qnaListSql, qnaListParams);
  },

  /**
   * @author 권준일
   * @description 답변한 qna 보기
   */

   answerQnaList: async (pageNum, maxPageNum) => {
      let answerQnaListSql = "select * from campers_test.qna where isResponse = 1 and isDelete = 0 by id DESC limit ?, ?;"
      let answerQnaListParams = [pageNum, maxPageNum];
      return await dbConnection(answerQnaListSql, answerQnaListParams);
  },

  /**
   * @author 권준일
   * @description 답변 안 한 qna 보기
   */

   dontAnswerQnaList: async (pageNum, maxPageNum) => {
      let dontAnswerQnaListSql = "select * from campers_test.qna where isResponse = 0 and isDelete = 0 by id DESC limit ?, ?;"
      let dontAnswerQnaListParams = [pageNum, maxPageNum];
      return await dbConnection(dontAnswerQnaListSql, dontAnswerQnaListParams);
  },

  /**
   * @author 권준일
   * @description qna 답변하기
   */

   answerQna: async (response,adId,id) => {
      let answerQnaSql = "update campers_test.qna set responseContents = ?, adminId = ? , isResponse = 1 where id = ?;"
      let answerQnaParams = [response, adId, id];
      return await dbTransactionConnection(answerQnaSql, answerQnaParams);
  },



  /**
   * @author 권준일
   * @description qna 답변 수정
   */

    reviseQna: async (response, adId, id) => {
    let reviseQnaSql = "update campers_test.qna set responseContents = ?, adminId = ? ,  where id = ?;"
    let reviseQnaParams = [response, adId, id];
    return await dbTransactionConnection(reviseQnaSql, reviseQnaParams);
},


 /**
   * @author 권준일
   * @description qna 상세
   */

    viewQna: async (id) => {
    let viewQnaSql = "select * from campers_test.qna where id = ?;"
    let viewQnaParams = [id];
    return await dbConnection(viewQnaSql, viewQnaParams);
}


}