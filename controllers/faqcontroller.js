const faqService = require('../services/faqservice')



module.exports = {

   /**
     * @author 권준일
     * @description faq 생성
     */
    createFaq: async (req, res, next) => {

      res.send(await faqService.createFaq(req))
  },


  /**
   * @author 권준일
   * @description faq 보기
   */
   faqList: async (req, res, next) => {

      res.send(await faqService.faqList())
  },

  /**
   * @author 권준일
   * @description faq 삭제
   */
   deleteFaq: async (req, res, next) => {

      res.send(await faqService.deleteFaq(req.body.id))
  },



   /**
   * @author 권준일
   * @description faq 수정
   */
    reviseFaq: async (req, res, next) => {

      res.send(await faqService.reviseFaq(req))
  },



   /**
   * @author 권준일
   * @description faq 상세
   */
    viewFaq: async (req, res, next) => {

      res.send(await faqService.viewFaq(req.body.id))
  }

}