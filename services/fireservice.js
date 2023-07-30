//MARK: - Modules
const fireModel = require('../models/firemodel')

//MARK: - Exports Business Logic
module.exports = {
    /**
     * @author 이영재
     * @description 공지사항 1개 가져오기.
     */
    getAnnouncement: async () => {
        console.log("-----Get Announcement Service.-----")
        return await fireModel.getAnnouncement()
    },

    /**
     * @author 이영재
     * @description 공지사항 리스트 가져오기.
     */
    getAnnouncementList: async () => {
        console.log("-----Get Announcement List Service.-----")
        return await fireModel.getAnnouncementList()
    },

    /**
     * @author 이영재
     * @description 공지사항 상세 조회.
     */
    getAnnouncementDetail: async (req) => {
        console.log("-----Get Announcement Detail Service.-----")
        return await fireModel.getAnnouncementDetail(req.params.id)
    },

    /**
     * @author 이영재
     * @description 칼럼 1개 가져오기.
     */
    getColumn: async () => {
        console.log("-----Get Column Service.-----")
        return await fireModel.getColumn()
    },

    /**
     * @author 이영재
     * @description 칼럼 리스트 가져오기.
     */
    getColumnList: async () => {
        console.log("-----Get Column List Service.-----")
        return await fireModel.getColumnList()
    },

    /**
     * @author 이영재
     * @description 칼럼 상세 조회.
     */
    getColumnDetail: async (req) => {
        console.log("-----Get Column Detail Service.-----")
        return await fireModel.getColumnDetail(req.params.id)
    },

    /**
     * @author 이영재
     * @description 기본 게시판 15개
     */
    getDefaultBoard: async() => {
        console.log("-----Get Default Board Service.-----")
        return await fireModel.getDefaultBoard()
    },

    /**
     * @author 이영재
     * @description 기본 게시판 목록
     */
    getDefaultBoardList: async() => {
        console.log("-----Get Default Board List Service.-----")
        return await fireModel.getDefaultBoardList()
    },

    /**
     * @author 이영재
     * @description 기본 게시판 게시물 목록
     */
    getDefaultBoardContentsList: async(req) => {
        console.log("-----Get Default Board Contents List Service.-----")
        return await fireModel.getDefaultBoardContentsList(req.params.id)
    },

    /**
     * @author 이영재
     * @description 기본 게시판 게시물 상세 내용
     */
    getDefaultBoardContentsDetail: async(req) => {
        console.log("-----Get Default Board Contents Detail Service.-----")
        return await fireModel.getDefaultBoardContentsDetail(req.params.id)
    },

    /**
     * @author 이영재
     * @description 기본 게시판 검색
     */
    searchDefaultBoard: async(req) => {
        console.log("-----Search Default Board Service.-----")
        return await fireModel.searchDefaultBoard(req.query.name)
    },

    /**
     * @author 이영재
     * @description 사용지 게시판 15개
     */
    getMemberBoard: async() => {
        console.log("-----Get Member Board Service.-----")
        return await fireModel.getMemberBoard()
    },

    /**
     * @author 이영재
     * @description 사용자 게시판 목록
     */
    getMemberBoardList: async() => {
        console.log("-----Get Member Board List Service.-----")
        return await fireModel.getMemberBoardList()
    },

    /**
     * @author 이영재
     * @description 사용자 게시판 게시물 목록
     */
    getMemberBoardContentsList: async(req) => {
        console.log("-----Get Member Board Contents List Service.-----")
        return await fireModel.getMemberBoardContentsList(req.params.id)
    },

    /**
     * @author 이영재
     * @description 사용자 게시판 게시물 상세 내용
     */
    getMemberBoardContentsDetail: async(req) => {
        console.log("-----Get Member Board Contents Detail Service.-----")
        return await fireModel.getMemberBoardContentsDetail(req.params.id)
    },

    /**
     * @author 이영재
     * @description 사용자 게시판 검색
     */
    searchMemberBoard: async(req) => {
        console.log("-----Search Member Board Service.-----")
        return await fireModel.searchMemberBoard(req.query.name)
    },

    /**
     * @author 이영재
     * @description 기본게시판 게시물 검색
     */
    searchDefaultBoardContents: async(req) => {
        console.log("-----Search Default Board Contents Service.-----")
        return await fireModel.searchDefaultBoardContents(req.query.title)
    },

    /**
     * @author 이영재
     * @description 사용자 게시판 게시물 검색
     */
    searchMemberBoardContents: async(req) => {
        console.log("-----Search Member Board Contents Service.-----")
        return await fireModel.searchMemberBoardContents(req.query.title)
    },

    /**
     * @author 이영재
     * @description 사용자 게시판 만들기
     */
    createMemberBoard: async(req) => {
        console.log("-----Create Member Board Service.-----")
        return await fireModel.createMemberBoard(req.body)
    },

    /**
     * @author 이영재
     * @description 사용자 게시판 게시물 글쓰기
     */
    createMemberBoardContents: async(req) => {
        console.log("-----Create Member Board Contents Service.-----")
        return await fireModel.createMemberBoardContents(req.body)
    },
}