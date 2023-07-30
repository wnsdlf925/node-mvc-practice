const manageMemberService = require('../services/managememberservice')







module.exports = {

  /**
   * @author 권준일
   * @description 탈퇴한 회원보기
   */

  secedeMemberList: async (req, res) => {
    
    res.send(await manageMemberService.secedeMemberList(req.query.pageNum))
  },

  /**
  * @author 권준일
  * @description 정지된 회원보기
  */

   banMemberList: async (req, res) => {
    res.send(await manageMemberService.banMemberList(req.query.pageNum))
  },

  /**
* @author 권준일
* @description 회원보기
*/

  memberList: async (req, res) => {
    res.send(await manageMemberService.memberList(req.query.pageNum))
  },

  /**
  * @author 권준일
  * @description 랭킹조회
  */

  memberRank: async (req, res) => {
    res.send(await manageMemberService.memberRank(req.query.pageNum))
  },

  /**
* @author 권준일
* @description 회원 정지시키기
*/

  banMember: async (req, res) => {
    res.send(await manageMemberService.banMember(req.body.memberId))
  },

  /**
  * @author 권준일
  * @description 회원 탈퇴시키기
  */

  secedeMember: async (req, res) => {
    res.send(await manageMemberService.secedeMember(req.body.memberId))
  },

}