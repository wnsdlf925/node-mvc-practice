//MARK: - Modules
const homeModel = require('../models/homemodel')

//MARK: - Exports Business Logic
module.exports = {
    /**
     * @author 이영재
     * @description Best Camper 상위 5명 조회
     */
    bestCamper: async () => {
        console.log("-----Best Camper Service.-----")
        return await homeModel.getBestCamper()
    },

    /**
     * @author 이영재
     * @description Best Camper 리스트 조회
     */
    bestCamperList: async () => {
        console.log("-----Best Camper List Service.-----")
        return await homeModel.getBestCamperList()
    },

    /**
     * @author 이영재
     * @description 최근 핫 게시물 상위 5개 조회
     */
    hotContents: async () => {
        console.log("-----Hot Contents Service.-----")
        return await homeModel.hotContents()
    },

    /**
     * @author 이영재
     * @description 핫 게시물 리스트 조회
     */
    hotContentsList: async () => {
        console.log("-----Hot Contents List Service.-----")
        return await homeModel.hotContentsList()
    },

    /**
     * @author 이영재
     * @description 핫 게시물 상세 내용 조회
     */
    hotContentsDetail: async (req) => {
        console.log("-----Hot Contents Detail Service.-----")
        return await req.params.type === "1" ? homeModel.memberHotContentsDetail(req.params.id) : homeModel.defaultHotContentsDetail(req.params.id)
    },

    /**
     * @author 이영재
     * @description 내가 올린 게시물 최근 5개 조회
     */
    myContents: async (req) => {
        console.log("-----My Contents Service.-----")
        const memberId = req.body.memberId
        return await homeModel.myContents(memberId)
    },
}