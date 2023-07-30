//MARK: - Modules
const adminService = require('../services/adminservice');
const mypageService = require('../services/mypageservice');

//MARK: - Exports
module.exports = {

   
 /**
     * @author 권준일
     * @description 관리자 로그인
     */
  login: async (req, res, next) => {

   return await adminService.login(req,res)
  
  },


/**
     * @author 권준일
     * @description 관리자 가입
     */
  signUp: async (req, res, next) => {
    
    res.send(await adminService.signUp(req.body.name, req.body.password))
  },


  


/**
     * @author 권준일
     * @description 관리자 세션 확인
     */
  checkSession: async (req,res,next) => {

    if(req.session.AdName != null){
        next()
    }else{
        LoginServiceRequest = {
            status: 400,
            payload: "session expire"
        }
        res.send(LoginServiceRequest)
    }
     
   
},
}