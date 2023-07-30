//MARK: - Modules
const {dbTransactionConnection, dbConnection} = require("../config/mysqlconfig")

//MARK: - Exports
module.exports = {

  /**
   * @author 권준일
   * @description faq 생성
   */
  createFaq: async (title,contents, adminId) => {
      let createFaqSql = "INSERT INTO campers_test.faq(title,contents,adminId) VALUE(?,?,?);"
      let createFaqParams = [title,contents, adminId];
      return await dbTransactionConnection(createFaqSql, createFaqParams);
  },

  /**
   * @author 권준일
   * @description faq 중복확인
   */

  duplFaq: async (title) => {
      let duplFaqSql = "select * from campers_test.faq where title = ? and isDelete = 0;"
      let duplFaqParams = [title];
      return await dbConnection(duplFaqSql, duplFaqParams);
  },

  /**
   * @author 권준일
   * @description faq 출력
   */

  faqList: async () => {
      let faqListSql = "select * from campers_test.faq where isDelete = 0;"
      let faqListParams = [];
      return await dbConnection(faqListSql, faqListParams);
  },

  /**
   * @author 권준일
   * @description faq 삭제
   */

  deleteFaq: async (id) => {
      let deleteFaqSql = "update campers_test.faq set isDelete = 1 where id = ?;"
      let deleteFaqParams = [id];
      return await dbTransactionConnection(deleteFaqSql, deleteFaqParams);
  },



  /**
   * @author 권준일
   * @description faq 수정
   */

    reviseFaq: async (title, contents, id) => {
    let reviseFaqSql = "update campers_test.faq set title = ?, contents = ? where id = ?;"
    let reviseFaqParams = [title, contents, id];
    return await dbTransactionConnection(reviseFaqSql, reviseFaqParams);
},


 /**
   * @author 권준일
   * @description faq 상세
   */

    viewFaq: async (id) => {
    let viewFaqSql = "select * from campers_test.faq where id = ?;"
    let viewFaqParams = [id];
    return await dbConnection(viewFaqSql, viewFaqParams);
}


}