//MARK: - Modules
const defaultBoardService = require("../services/defaultboardservice")

//MARK: - Exports
module.exports = {
    /**
     * @author 권준일
     * @description 기본 게시판 생성
     */
    createDefaultBoard: async (req, res, next) => {

        res.send(await defaultBoardService.createBoard(req.body.name))
    },


    /**
     * @author 권준일
     * @description 기본 게시판 출력
     */
    defaultBoardList: async (req, res, next) => {

        res.send(await defaultBoardService.defaultBoardList())
    },

    /**
     * @author 권준일
     * @description 기본 게시판 삭제
     */
    deleteDefaultBoard: async (req, res, next) => {

        res.send(await defaultBoardService.deleteDefaultBoard(req.body.id))
    }
}