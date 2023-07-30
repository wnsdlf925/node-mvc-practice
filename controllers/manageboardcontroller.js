//MARK: - Modules
const manageBoardService = require("../services/manageboardservice")

//MARK: - Exports
module.exports = {
    /**
     * @author 권준일
     * @description 기본 게시판 생성
     */
    createDefaultBoard: async (req, res, next) => {

        res.send(await manageBoardService.createBoard(req.body.name))
    },


    /**
     * @author 권준일
     * @description 기본 게시판 출력
     */
    defaultBoardList: async (req, res, next) => {

        res.send(await manageBoardService.defaultBoardList())
    },

    /**
     * @author 권준일
     * @description 기본 게시판 삭제
     */
    deleteDefaultBoard: async (req, res, next) => {

        res.send(await manageBoardService.deleteDefaultBoard(req.body.id))
    },


//-------------------------------------여기부터 만들기----------------------------------------------------

    /**
     * @author 권준일
     * @description 게시물 삭제 
     */
 deleteBoard: async (req, res, next) => {

    res.send(await manageBoardService.deleteBoard(req.body.id))
},

   /**
     * @author 권준일
     * @description 게시물 신고 횟수 조회 
     */
    boardReport: async (req, res, next) => {

        res.send(await manageBoardService.boardReport(req.body.id))
    },


    /**
     * @author 권준일
     * @description 게시물 신고 사유 조회 
     */
     boardReportReason: async (req, res, next) => {

        res.send(await manageBoardService.boardReportReason(req.body.id))
    },

    /**
     * @author 권준일
     * @description 게시물 조회수 조회 
     */
     boardView: async (req, res, next) => {

        res.send(await manageBoardService.boardView(req.body.id))
    },


     /**
     * @author 권준일
     * @description 첨부파일 다운로드?? 보류
     */
      downloadFile: async (req, res, next) => {

        res.send(await manageBoardService.deleteDefaultBoard(req.body.id))
    },

}