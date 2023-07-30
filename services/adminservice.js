//MARK: - Modules
const adminModel = require('../models/adminmodel');
const bcrypt = require('bcrypt');
const {NotExtended} = require('http-errors');

//MARK: - Exports Business Logic
module.exports = {

    /**
     * @author 권준일
     * @description 관리자 로그인
     */

    login: async function (req, res) {


        let flag = false
        failLoginRequest = {
            status: 201,
            payload: ""
        }


        return await adminModel.login(req.body.name)
            .then((value) => {
                //아이디가 있다면
                if (value.status == 200 && value.payload.length != 0) {
                    //비밀번호가 일치하다면
                
                    if(bcrypt.compareSync(req.body.password,value.payload[0].password)){
                            LoginServiceRequest.payload= "success login"
                        return LoginServiceRequest
                    }else{
                        LoginServiceRequest.payload= "fail password"
                        return LoginServiceRequest
                    }
                }else{
                    console.log("ssssssssssssss")
                    LoginServiceRequest.payload= "fail ID"
                    return LoginServiceRequest
                }

            })


    },


    /**
     * @author 권준일
     * @description 관리자 가입
     */
    signUp: async (name, password) => {

        return await adminModel.signUp(name, bcrypt.hashSync(password, 10));
    },
}