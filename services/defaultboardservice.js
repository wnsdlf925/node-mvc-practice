//MARK: - Modules
const defaultBoardModel = require("../models/defaultboard")

//MARK: - Exports Business Logic
module.exports = {

    /**
     * @author 권준일
     * @description 기본 게시판 생성
     */
    createBoard: async (name) => {
        let duplicate
        //중복 검사
         return await defaultBoardModel.duplDefaultBoard(name)
            .then((value) => {
                
                //디비 오류 분기
                if(value.status == 200){
                    //중복확인
                    if (value.payload.length == 0) {
                        return new Promise((resolve, reject) => {
                        resolve(defaultBoardModel.createDefaultBoard(name))
                        })
                        
                        //duplicate = true
                    } else {
                         
                            return new Promise((resolve, reject) => {
                                
                                duplicateRequest = {
                                    status: 201,
                                    payload: "duplicate"
                                }
                                resolve(duplicateRequest)
                            })
                        
                        //duplicate = false
                    }
                }else{
                    return value
                }
            })
        
        // if (duplicate) {
        //     return await defaultBoardModel.createDefaultBoard(name)
        // } else {
        //     duplicateRequest = {
        //         status: 201,
        //         payload: "duplicate"
        //     }
        //     return await duplicateRequest
        // }

    },


    /**

     * @author 권준일
     * @description 기본 게시판 출력
     */

    defaultBoardList: async () => {
        return await defaultBoardModel.defaultBoardList()
    },

    /**

     * @author 권준일
     * @description 기본 게시판 삭제
     */

    deleteDefaultBoard: async (id) => {
        return await defaultBoardModel.deleteDefaultBoard(id)
    }


}