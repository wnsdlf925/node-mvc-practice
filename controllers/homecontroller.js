//MARK: - Modules
const homeService = require('../services/homeservice')

//MARK: - Exports
module.exports = {
    /**
     * @author 이영재
     * @description Best Camper 상위 5명 조회
     */
    bestCamper: async (req, res) => {
        console.log("-----Best Camper Controller.-----")
        res.send(await homeService.bestCamper())
    },

    /**
     * @author 이영재
     * @description Best Camper 리스트 조회
     */
    bestCamperList: async (req, res) => {
        console.log("-----Best Camper List Controller.-----")
        res.send(await homeService.bestCamperList())
    },

    /**
     * @author 이영재
     * @description 최근 핫 게시물 상위 5개 조회
     */
    hotContents: async (req, res) => {
        console.log("-----Hot Contents Controller.-----")
        res.send(await homeService.hotContents())
    },

    /**
     * @author 이영재
     * @description 핫 게시물 리스트 조회
     */
    hotContentsList: async (req, res) => {
        console.log("-----Hot Contents List Controller.-----")
        res.send(await homeService.hotContentsList())
    },

    /**
     * @author 이영재
     * @description 핫 게시물 상세 내용 조회
     */
    hotContentsDetail: async (req, res) => {
        console.log("-----Hot Contents Detail Controller.-----")
        res.send(await homeService.hotContentsDetail(req))
    },

    /**
     * @author 이영재
     * @description 내가 올린 게시물 최근 5개 조회
     */
    myContents: async (req, res) => {
        console.log("-----My Contents Controller.-----")
        res.send(await homeService.myContents(req))
    },
}