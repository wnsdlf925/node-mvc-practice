//MARK: - Modules
const fireService = require('../services/fireservice')

//MARK: - Exports
module.exports = {
    /**
     * @author 이영재
     * @description 공지사항 1개 가져오기.
     */
    getAnnouncement: async (req, res) => {
        console.log("-----Get Announcement Controller.-----")
        res.send(await fireService.getAnnouncement())
    },

    /**
     * @author 이영재
     * @description 공지사항 목록 가져오기.
     */
    getAnnouncementList: async (req, res) => {
        console.log("-----Get Announcement List Controller.-----")
        res.send(await fireService.getAnnouncementList())
    },

    /**
     * @author 이영재
     * @description 공지사항 상세 조회.
     */
    getAnnouncementDetail: async (req, res) => {
        console.log("-----Get Announcement Detail Controller.-----")
        res.send(await fireService.getAnnouncementDetail(req))
    },

    /**
     * @author 이영재
     * @description 칼럼 1개 가져오기.
     */
    getColumn: async (req, res) => {
        console.log("-----Get Column Controller.-----")
        res.send(await fireService.getColumn())
    },

    /**
     * @author 이영재
     * @description 칼럼 목록 가져오기.
     */
    getColumnList: async (req, res) => {
        console.log("-----Get Column List Controller.-----")
        res.send(await fireService.getColumnList())
    },

    /**
     * @author 이영재
     * @description 칼럼 상세 조회.
     */
    getColumnDetail: async (req, res) => {
        console.log("-----Get Column Detail Controller.-----")
        res.send(await fireService.getColumnDetail(req))
    },

    /**
     * @author 이영재
     * @description 기본 게시판 15개
     */
    getDefaultBoard: async (req, res) => {
        console.log("-----Get Default Board Controller.-----")
        res.send(await fireService.getDefaultBoard())
    },

    /**
     * @author 이영재
     * @description 기본 게시판 목록
     */
    getDefaultBoardList: async (req, res) => {
        console.log("-----Get Default Board List Controller.-----")
        res.send(await fireService.getDefaultBoardList())
    },

    /**
     * @author 이영재
     * @description 기본 게시판 게시물 목록
     */
    getDefaultBoardContentsList: async (req, res) => {
        console.log("-----Get Default Board Contents List Controller.-----")
        res.send(await fireService.getDefaultBoardContentsList(req))
    },

    /**
     * @author 이영재
     * @description 기본 게시판 게시물 상세 내용
     */
    getDefaultBoardContentsDetail: async (req, res) => {
        console.log("-----Get Default Board Contents Detail Controller.-----")
        res.send(await fireService.getDefaultBoardContentsDetail(req))
    },

    /**
     * @author 이영재
     * @description 기본 게시판 검색
     */
    searchDefaultBoard: async (req, res) => {
        console.log("-----Search Default Board Controller.-----")
        res.send(await fireService.searchDefaultBoard(req))
    },

    /**
     * @author 이영재
     * @description 사용자 게시판 15개
     */
    getMemberBoard: async (req, res) => {
        console.log("-----Get Member Board Controller.-----")
        res.send(await fireService.getMemberBoard())
    },

    /**
     * @author 이영재
     * @description 사용자 게시판 목록
     */
    getMemberBoardList: async (req, res) => {
        console.log("-----Get Member Board List Controller.-----")
        res.send(await fireService.getMemberBoardList())
    },

    /**
     * @author 이영재
     * @description 사용자 게시판 게시물 목록
     */
    getMemberBoardContentsList: async (req, res) => {
        console.log("-----Get Member Board Contents List Controller.-----")
        res.send(await fireService.getMemberBoardContentsList(req))
    },

    /**
     * @author 이영재
     * @description 사용자 게시판 게시물 상세 내용
     */
    getMemberBoardContentsDetail: async (req, res) => {
        console.log("-----Get Member Board Contents Detail Controller.-----")
        res.send(await fireService.getMemberBoardContentsDetail(req))
    },

    /**
     * @author 이영재
     * @description 사용자 게시판 검색
     */
    searchMemberBoard: async (req, res) => {
        console.log("-----Search Member Board Controller.-----")
        res.send(await fireService.searchMemberBoard(req))
    },

    /**
     * @author 이영재
     * @description 기본게시판 게시물 검색
     */
    searchDefaultBoardContents: async (req, res) => {
        console.log("-----Search Default Board Contents Controller.-----")
        res.send(await fireService.searchDefaultBoardContents(req))
    },

    /**
     * @author 이영재
     * @description 사용자 게시판 게시물 검색
     */
    searchMemberBoardContents: async (req, res) => {
        console.log("-----Search Member Board Contents Controller.-----")
        res.send(await fireService.searchMemberBoardContents(req))
    },

    /**
     * @author 이영재
     * @description 사용자 게시판 만들기
     */
    createMemberBoard: async (req, res) => {
        console.log("-----Create Member Board Controller.-----")
        res.send(await fireService.createMemberBoard(req))
    },

    /**
     * @author 이영재
     * @description 사용자 게시판 게시물 글쓰기
     */
    createMemberBoardContents: async (req, res) => {
        console.log("-----Create Member Board Contents Controller.-----")
        res.send(await fireService.createMemberBoardContents(req))
    },
}