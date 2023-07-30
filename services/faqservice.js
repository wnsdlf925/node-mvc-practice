const faqModel = require('../models/faqmodel')


module.exports = {

  /**
   * @author 권준일
   * @description faq 생성
   */
   createFaq: async (req) => {
      
      return await faqModel.duplFaq(req.body.title)
      .then((value) => {
                
        //디비 오류 분기
        if(value.status == 200){
            //중복확인
            if (value.payload.length == 0) {
                return new Promise((resolve) => {
                resolve(faqModel.createFaq(req.body.title, req.body.contents, req.session.AdId))
                })
                
                //duplicate = true
            } else {
                 
                    return new Promise((resolve, reject) => {
                        
                        duplicateRequest = {
                            status: 201,
                            payload: "duplicate"
                        }
                        resolve(duplicateRequest)
                        reject(duplicateRequest)
                    })
                
                //duplicate = false
            }
        }else{
            return value
        }
    })

  },


   /**
   * @author 권준일
   * @description faq 출력
   */
    faqList: async () => {
       
      return await faqModel.faqList();
 },

  /**
   * @author 권준일
   * @description faq 삭제
   */
   deleteFaq: async (id) => {
       
    return await faqModel.deleteFaq(id);
},


 /**
   * @author 권준일
   * @description faq 수정
   */
  reviseFaq: async (req) => {
       
    return await faqModel.reviseFaq(req.body.title, req.body.contents, req.body.id );
},



 /**
   * @author 권준일
   * @description faq 상세
   */
  viewFaq: async (id) => {
       
    return await faqModel.viewFaq(id);
},


 
  

}