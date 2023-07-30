const {dbTransactionConnection, dbConnection} = require("../config/mysqlconfig")

module.exports = {


    /**
     * @author 권준일
     * @description 게시물 삭제
     */
 deleteBoard: async (id) => {
  let deleteBoardSql = " UPDATE campers_test.memberBoardContents SET isDelete = 1 where id = ?;"
  let deleteBoardParams = [id];
  return await dbTransactionConnection(deleteBoardSql, deleteBoardParams);
},


/**
     * @author 권준일
     * @description 게시물 신고 횟수 조회 
     */
 boardReport: async (id) => {
  let boardReportSql = "SELECT reportCount FROM campers_test.memberBoardContents WHERE id = ?;"
  let boardReportParams = [id];
  return await dbConnection(boardReportSql, boardReportParams);
},



/**
     * @author 권준일
     * @description 게시물 신고 사유 조회 
     */
 boardReportReason: async (id) => {
  let boardReportReasonSql = "SELECT reportInfo FROM campers_test.memberBoardContents WHERE id =?;"
  let boardReportReasonParams = [id];
  return await dbConnection(boardReportReasonSql, boardReportReasonParams);
},


/**
     * @author 권준일
     * @description 게시물 조회수 조회 
     */
 boardView: async (id) => {
  let boardViewSql = "SELECT viewCount FROM campers_test.memberBoardContents WHERE id = ?;"
  let boardViewParams = [id];
  return await dbConnection(boardViewSql, boardViewParams);
},

}