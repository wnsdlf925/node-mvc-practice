const {dbTransactionConnection, dbConnection} = require('../config/mysqlconfig')


module.exports = {

        /**
     * @author 권준일
     * @description 탈퇴한 회원보기
     */
         secedeMemberList: async (pageNum, maxPageNum) => {
      let secedeMemberListSql = "SELECT * FROM campers_test.member where secede = 1 LIMIT ?,?;"
      let secedeMemberListParams = [pageNum, maxPageNum];
      return await dbConnection(secedeMemberListSql, secedeMemberListParams);
    },


    /**
     * @author 권준일
     * @description 정지된 회원보기
     */
     banMemberList: async (pageNum, maxPageNum) => {
      let banMemberListSql = " SELECT * FROM campers_test.member where ban = 1 LIMIT ?,?;"
      let banMemberListParams = [pageNum, maxPageNum];
      return await dbConnection(banMemberListSql, banMemberListParams);
    },

    /**
     * @author 권준일
     * @description 회원보기
     */
     memberList: async (pageNum, maxPageNum) => {
      let memberListSql = "SELECT * FROM campers_test.member where secede = 0 LIMIT ?,?;" + "SELECT count(*) as totalNum FROM campers_test.member where secede = 0;"
      let memberListParams = [pageNum, maxPageNum];
      return await dbConnection(memberListSql, memberListParams);
    },

    /**
     * @author 권준일
     * @description 랭킹조회
     */
     memberRank: async (pageNum, maxPageNum) => {
      let memberRankSql = "select * from campers_test.member where secede = 0  order by campers_test.member.rank asc limit ?,?;"
      let memberRankParams = [pageNum, maxPageNum];
      return await dbConnection(memberRankSql, memberRankParams);
    },

    /**
     * @author 권준일
     * @description 회원 정지시키기
     */
     banMember: async (id) => {
      let banMemberSql = " UPDATE campers_test.member SET ban = 1 where id = ?;"
      let banMemberParams = [id];
      return await dbTransactionConnection(banMemberSql, banMemberParams);
    },

    /**
     * @author 권준일
     * @description 회원 탈퇴시키기
     */
     secedeMember: async (id) => {
      let secedeMemberSql = " UPDATE campers_test.member SET secede = 1 where id = ?;"
      let secedeMemberParams = [id];
      return await dbTransactionConnection(secedeMemberSql, secedeMemberParams);
    },

}