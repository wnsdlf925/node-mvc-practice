const adManageMember = require('../models/admanagemembermodel')


module.exports = {
   /**
   * @author 권준일
   * @description 탈퇴한 회원보기
   */

  secedeMemberList: async (pageNum) => {
    
    return await adManageMember.secedeMemberList((pageNum-1)*15, (pageNum-1)*15+15 )
  },

  /**
  * @author 권준일
  * @description 정지된 회원보기
  */

   banMemberList: async (pageNum) => {
    
    return await adManageMember.banMemberList((pageNum-1)*15, (pageNum-1)*15+15)
  },

  /**
* @author 권준일
* @description 회원보기
*/

  memberList: async (pageNum) => {
   
    return await adManageMember.memberList((pageNum-1)*15, (pageNum-1)*15+15)
  },

  /**
  * @author 권준일
  * @description 랭킹조회
  */

  memberRank: async (pageNum) => {
    
    return await adManageMember.memberRank((pageNum-1)*15, (pageNum-1)*15+15)
  },

  /**
* @author 권준일
* @description 회원 정지시키기
*/

  banMember: async (memberId) => {
    return await adManageMember.banMember(memberId)
  },

  /**
  * @author 권준일
  * @description 회원 탈퇴시키기
  */

  secedeMember: async (memberId) => {
    return await adManageMember.secedeMember(memberId)
  },
}