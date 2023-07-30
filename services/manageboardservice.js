//MARK: - Modules
const defaultBoardModel = require("../models/defaultboard")
const adManageboardModel = require("../models/admanageboardmodel")

//MARK: - Exports Business Logic
module.exports = {

    /**
     * @author 권준일
     * @description 기본 게시판 생성
     */ 
    
    createBoard: async (name) => {
        
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
    },




/**

     * @author 권준일
     * @description 게시물 삭제
     */

 deleteBoard: async (id) => {
    return await adManageboardModel.deleteBoard(id)
},


/**

     * @author 권준일
     * @description 게시물 신고 횟수 조회 
     */

 boardReport: async (id) => {
    return await adManageboardModel.boardReport(id)
},

/**

     * @author 권준일
     * @description 게시물 신고 사유 조회 
     */

 boardReportReason: async (id) => {
    return await adManageboardModel.boardReportReason(id)
},


/**

     * @author 권준일
     * @description 게시물 조회수 조회 
     */

 boardView: async (id) => {
    return await adManageboardModel.boardView(id)
},


}