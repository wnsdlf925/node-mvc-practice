//MARK: - Modules
const {dbTransactionConnection, dbConnection} = require("../config/mysqlconfig")
const cron = require('node-cron')

//MARK: - Cron Schedule
//Rank Scheduler 00 00 * * 1 매주 월요일 00 시 00분.
cron.schedule('00 00 * * 1', () => {
    console.log('-----Ranking Scheduling.-----')
    let updateRankSql = 'UPDATE member a, (SELECT b.id, @rank := @rank + 1 as `rank`\n' +
        '                  FROM member b,\n' +
        '                       (SELECT @rank := 0) rn\n' +
        '                  ORDER BY b.totalFire DESC, b.id) c\n' +
        'SET a.`rank`= c.`rank`\n' +
        'WHERE a.id = c.id;'
    let updateRankParams = []
    dbTransactionConnection(updateRankSql, updateRankParams).then(r => console.log(r)).catch(e => console.error(e))
}, {
    schedule: true,
    timezone: "Asia/Seoul"
})

//MARK: - Exports
module.exports = {
    /**
     * @author 이영재
     * @description 공지사항 1개 가져오기
     */
    getAnnouncement: async () => {
        console.log("-----Get Announcement Model.-----")
        let getAnnouncementSql = "SELECT dbc.id, dbc.title, dbc.date, dbc.nickName, dbc.fireCount, dbc.viewCount FROM defaultBoard db, defaultBoardContents dbc, member m WHERE db.id = dbc.defaultBoardId and m.ban = ? and m.secede = ? and dbc.isDelete = ? and db.id = ? ORDER BY dbc.date DESC LIMIT ?;"
        let getAnnouncementParams = [0, 0, 0, 1, 1]
        return await dbConnection(getAnnouncementSql, getAnnouncementParams)
    },

    /**
     * @author 이영재
     * @description 공지사항 리스트 가져오기
     */
    getAnnouncementList: async () => {
        console.log("-----Get Announcement List Model.-----")
        let getAnnouncementListSql = "SELECT dbc.id, dbc.title, dbc.date, dbc.nickName, dbc.fireCount, dbc.viewCount FROM defaultBoardContents dbc, defaultBoard db WHERE db.id = dbc.defaultBoardId and db.isDelete = ? and dbc.isDelete = ? and db.id = ? ORDER BY dbc.date DESC;"
        let getAnnouncementListParams = [0, 0, 1]
        return await dbConnection(getAnnouncementListSql, getAnnouncementListParams)
    },

    /**
     * @author 이영재
     * @description 공지사항 상세 조회.
     */
    getAnnouncementDetail: async (id) => {
        console.log("-----Get Announcement Detail Model.-----")
        let getAnnouncementDetailSql = "SELECT * FROM defaultBoard db, defaultBoardContents dbc, defaultBoardComments dbm, member m\n" +
            "where db.id = dbc.defaultBoardId and dbc.id = dbm.defaultBoardContentsId and dbm.memberId = m.id and db.isDelete = ? and dbc.isDelete = ? and dbm.isDelete = ? and db.id = ? and dbc.id = ? and m.ban = ? and m.secede = ?;"
        let getAnnouncementDetailParams = [0, 0, 0, 1, id, 0, 0]
        return await dbConnection(getAnnouncementDetailSql, getAnnouncementDetailParams)
    },

    /**
     * @author 이영재
     * @description 칼럼 1개 가져오기
     */
    getColumn: async () => {
        console.log("-----Get Column Model.-----")
        let getColumnSql = "SELECT dbc.id, dbc.title, dbc.date, dbc.nickName, dbc.fireCount, dbc.viewCount FROM defaultBoard db, defaultBoardContents dbc, member m WHERE db.id = dbc.defaultBoardId and m.ban = ? and m.secede = ? and dbc.isDelete = ? and db.id = ? ORDER BY dbc.date DESC LIMIT ?;"
        let getColumnParams = [0, 0, 0, 2, 1]
        return await dbConnection(getColumnSql, getColumnParams)
    },

    /**
     * @author 이영재
     * @description 칼럼 리스트 가져오기
     */
    getColumnList: async () => {
        console.log("-----Get Column List Model.-----")
        let getColumnListSql = "SELECT dbc.id, dbc.title, dbc.date, dbc.nickName, dbc.fireCount, dbc.viewCount FROM defaultBoardContents dbc, defaultBoard db WHERE db.id = dbc.defaultBoardId and db.isDelete = ? and dbc.isDelete = ? and db.id = ? ORDER BY dbc.date DESC;"
        let getColumnListParams = [0, 0, 2]
        return await dbConnection(getColumnListSql, getColumnListParams)
    },

    /**
     * @author 이영재
     * @description 칼럼 상세 조회.
     */
    getColumnDetail: async (id) => {
        console.log("-----Get Column Detail Model.-----")
        let getColumnDetailSql = "SELECT * FROM defaultBoard db, defaultBoardContents dbc, defaultBoardComments dbm, member m\n" +
            "where db.id = dbc.defaultBoardId and dbc.id = dbm.defaultBoardContentsId and dbm.memberId = m.id and db.isDelete = ? and dbc.isDelete = ? and dbm.isDelete = ? and db.id = ? and dbc.id = ? and m.ban = ? and m.secede = ?;"
        let getColumnDetailParams = [0, 0, 0, 2, id, 0, 0]
        return await dbConnection(getColumnDetailSql, getColumnDetailParams)
    },

    /**
     * @author 이영재
     * @description 기본 게시판 15개
     */
    getDefaultBoard: async () => {
        console.log("-----Get Default Board Model.-----")
        let getDefaultBoardSql = "SELECT id, name FROM defaultBoard WHERE isDelete = ? and id > ? limit ?;"
        let getDefaultBoardParams = [0, 2, 15]
        return await dbConnection(getDefaultBoardSql, getDefaultBoardParams)
    },

    /**
     * @author 이영재
     * @description 기본 게시판 목록
     */
    getDefaultBoardList: async () => {
        console.log("-----Get Default Board List Model.-----")
        let getDefaultBoardListSql = "SELECT id, name FROM defaultBoard WHERE isDelete = ? and id > ?;"
        let getDefaultBoardListParams = [0, 2]
        return await dbConnection(getDefaultBoardListSql, getDefaultBoardListParams)
    },

    /**
     * @author 이영재
     * @description 기본 게시판 게시물 목록
     */
    getDefaultBoardContentsList: async (id) => {
        console.log("-----Get Default Board Contents List Model.-----")
        let getDefaultBoardContentsListSql = "SELECT dbc.id, dbc.title, dbc.date, dbc.editDate, dbc.nickName, dbc.fireCount, dbc.viewCount\n" +
            "FROM defaultBoard db JOIN defaultBoardContents dbc ON db.id = dbc.defaultBoardId\n" +
            "LEFT OUTER JOIN(SELECT id, ban, secede FROM member) m ON dbc.memberId = m.id\n" +
            "LEFT OUTER JOIN(SELECT id, name FROM admin) a ON dbc.adminId = a.id\n" +
            "WHERE db.isDelete = ? and db.id = ? and (m.secede = ? or m.secede IS NULL) and (m.ban = ? or m.ban IS NULL) and dbc.isDelete = ?\n" +
            "ORDER BY dbc.date DESC;"
        let getDefaultBoardContentsListParams = [0, id, 0, 0, 0]
        return await dbConnection(getDefaultBoardContentsListSql, getDefaultBoardContentsListParams)
    },

    /**
     * @author 이영재
     * @description 기본 게시판 게시물 상세 내용
     */
    getDefaultBoardContentsDetail: async (id) => {
        console.log("-----Get Default Board Contents Detail Model.-----")
        let getDefaultBoardContentsDetailSql = "SELECT dbc.id, dbc.title, dbc.date, dbc.editDate, dbc.nickName, dbc.fireCount, dbc.viewCount, dbc.contents, dbc.hotContents, dbc.hotDate, dbc.reportInfo,\n" +
            "       dbm.info, dbm.editDate, dbm.reportInfo, dbm.fireCount\n" +
            "FROM defaultBoard db JOIN defaultBoardContents dbc ON db.id = dbc.defaultBoardId\n" +
            "LEFT OUTER JOIN(SELECT id, ban, secede FROM member) m ON dbc.memberId = m.id\n" +
            "LEFT OUTER JOIN(SELECT * FROM defaultBoardComments dbm JOIN member m ON dbm.memberId = m.id) dbm ON dbc.id = dbm.defaultBoardContentsId\n" +
            "LEFT OUTER JOIN(SELECT id, name FROM admin) a ON dbc.adminId = a.id\n" +
            "WHERE db.isDelete = ? and (m.secede = ? or m.secede IS NULL) and (m.ban = ? or m.ban IS NULL) and dbc.isDelete = ? and (dbm.isDelete = ? or dbm.isDelete IS NULL) and dbc.id = ?;"
        let getDefaultBoardContentsDetailParams = [0, 0, 0, 0, 0, id]
        return await dbConnection(getDefaultBoardContentsDetailSql, getDefaultBoardContentsDetailParams)
    },

    /**
     * @author 이영재
     * @description 기본 게시판 검색
     */
    searchDefaultBoard: async (name) => {
        console.log("-----Search Default Board Model.-----")
        let searchDefaultBoardSql = "SELECT id, name FROM defaultBoard WHERE MATCH (name) AGAINST (? IN Boolean MODE) and isDelete = ?;"
        let searchDefaultBoardParams = [name, 0]
        return await dbConnection(searchDefaultBoardSql, searchDefaultBoardParams)
    },

    /**
     * @author 이영재
     * @description 사용자 게시판 15개
     */
    getMemberBoard: async () => {
        console.log("-----Get Member Board Model.-----")
        let getMemberBoardSql = "SELECT memberBoard.id, memberBoard.name, memberBoard.date\n" +
            "FROM member, memberBoard\n" +
            "WHERE member.id = memberBoard.creator and member.ban = ? and member.secede = ? and memberBoard.isDelete = ?\n" +
            "ORDER BY memberBoard.date DESC limit ?;"
        let getMemberBoardParams = [0, 0, 0, 15]
        return await dbConnection(getMemberBoardSql, getMemberBoardParams)
    },

    /**
     * @author 이영재
     * @description 사용자 게시판 목록
     */
    getMemberBoardList: async () => {
        console.log("-----Get Member Board List Model.-----")
        let getMemberBoardListSql = "SELECT memberBoard.id, memberBoard.name, memberBoard.date\n" +
            "FROM member, memberBoard\n" +
            "WHERE member.id = memberBoard.creator and member.ban = ? and member.secede = ? and memberBoard.isDelete = ?\n" +
            "ORDER BY memberBoard.date DESC;"
        let getMemberBoardListParams = [0, 0, 0]
        return await dbConnection(getMemberBoardListSql, getMemberBoardListParams)
    },

    /**
     * @author 이영재
     * @description 사용자 게시판 게시물 목록
     */
    getMemberBoardContentsList: async (id) => {
        console.log("-----Get Member Board Contents List Model.-----")
        let getMemberBoardContentsListSql = "SELECT mbc.id, mbc.title, mbc.date, mbc.editDate, mbc.nickName, mbc.fireCount, mbc.viewCount\n" +
            "FROM member m, memberBoard mb, memberBoardContents mbc\n" +
            "WHERE mb.id = mbc.memberBoardId and m.id = mbc.memberId and mb.isDelete = ? and m.ban = ? and m.secede = ?\n" +
            "and mbc.isDelete = ? and mb.id = ?\n" +
            "ORDER BY mbc.date DESC;"
        let getMemberBoardContentsListParams = [0, 0, 0, 0, id]
        return await dbConnection(getMemberBoardContentsListSql, getMemberBoardContentsListParams)
    },

    /**
     * @author 이영재
     * @description 사용자 게시판 게시물 상세 내용
     */
    getMemberBoardContentsDetail: async (id) => {
        console.log("-----Get Member Board Contents Detail Model.-----")
        let getMemberBoardContentsDetailSql = "SELECT mbc.id, mbc.title, mbc.date, mbc.nickName, mbc.editDate, mbc.fireCount, mbc.contents, mbc.viewCount, mbc.reportInfo,\n" +
            "       mbc.hotContents, mbc.hotDate, mbm.info, mbm.editDate, mbm.reportInfo, mbm.fireCount\n" +
            "FROM member m JOIN memberBoardContents mbc ON m.id = mbc.memberId\n" +
            "JOIN memberBoard mb ON mbc.memberBoardId = mb.id\n" +
            "LEFT OUTER JOIN memberBoardComments mbm ON mbc.id = mbm.memberBoardContentsId\n" +
            "WHERE mb.isDelete = ? and mbc.isDelete = ? and m.ban = ? and m.secede = ? and (mbm.isDelete = ? or mbm.isDelete IS NULL)\n" +
            "and mbc.id = ?;"
        let getMemberBoardContentsDetailParams = [0, 0, 0, 0, 0, id]
        return await dbConnection(getMemberBoardContentsDetailSql, getMemberBoardContentsDetailParams)
    },

    /**
     * @author 이영재
     * @description 사용자 게시판 검색
     */
    searchMemberBoard: async (name) => {
        console.log("-----Search Member Board Model.-----")
        let searchMemberBoardSql = "SELECT mb.id, mb.name, mb.date, mb.creator\n" +
            "FROM memberBoard mb JOIN member m ON mb.creator = m.id\n" +
            "WHERE MATCH (name) AGAINST (? IN Boolean MODE) and mb.isDelete = ? and m.ban = ? and m.secede = ?\n" +
            "ORDER BY mb.date DESC;"
        let searchMemberBoardParams = [name, 0, 0, 0]
        return await dbConnection(searchMemberBoardSql, searchMemberBoardParams)
    },

    /**
     * @author 이영재
     * @description 기본게시판 게시물 검색
     */
    searchDefaultBoardContents: async (title) => {
        console.log("-----Search Default Board Contents Model.-----")
        let searchDefaultBoardContentsSql = "SELECT dbc.id, dbc.title, dbc.date, dbc.editDate, dbc.nickName, dbc.fireCount, dbc.viewCount\n" +
            "FROM defaultBoard db JOIN defaultBoardContents dbc ON db.id = dbc.defaultBoardId\n" +
            "LEFT OUTER JOIN(SELECT id, ban, secede FROM member) m ON dbc.memberId = m.id\n" +
            "LEFT OUTER JOIN(SELECT id, name FROM admin) a ON dbc.adminId = a.id\n" +
            "WHERE MATCH (title) AGAINST (? IN Boolean MODE) and db.isDelete = ? and (m.secede = ? or m.secede IS NULL) and (m.ban = ? or m.ban IS NULL) and dbc.isDelete = ?\n" +
            "ORDER BY dbc.date DESC;"
        let searchDefaultBoardContentsParams = [title, 0, 0, 0, 0]
        return await dbConnection(searchDefaultBoardContentsSql, searchDefaultBoardContentsParams)
    },

    /**
     * @author 이영재
     * @description 사용자 게시판 게시물 검색
     */
    searchMemberBoardContents: async (title) => {
        console.log("-----Search Member Board Contents Model.-----")
        let searchMemberBoardContentsSql = "SELECT mbc.id, mbc.title, mbc.date, mbc.editDate, mbc.nickName, mbc.fireCount, mbc.viewCount\n" +
            "FROM member m, memberBoard mb, memberBoardContents mbc\n" +
            "WHERE MATCH (title) AGAINST (? IN Boolean MODE) and mb.id = mbc.memberBoardId and m.id = mbc.memberId and mb.isDelete = ? and m.ban = ? and m.secede = ?\n" +
            "and mbc.isDelete = ?\n" +
            "ORDER BY mbc.date DESC;"
        let searchMemberBoardContentsParams = [title, 0, 0, 0, 0]
        return await dbConnection(searchMemberBoardContentsSql, searchMemberBoardContentsParams)
    },

    /**
     * @author 이영재
     * @description 사용자 게시판 만들기
     */
    createMemberBoard: async (body) => {
        console.log("-----Create Member Board Model.-----")
        let createMemberBoardSql = "INSERT INTO memberBoard(name, date, creator) VALUES(?, ?, ?);"
        let createMemberBoardParams = [body.name, new Date(), body.memberId]
        return await dbTransactionConnection(createMemberBoardSql, createMemberBoardParams)
    },

    /**
     * @author 이영재
     * @description 사용자 게시판 게시물 글쓰기
     */
    createMemberBoardContents: async (body) => {
        console.log("-----Create Member Board Contents Model.-----")
        let createMemberBoardContentsSql = "INSERT INTO memberBoardContents(title, date, nickName, contents, memberBoardId, memberId) VALUES(?, ?, ?, ?, ?, ?);"
        let createMemberBoardContentsParams = [body.title, new Date(), body.nickName, body.contents, body.memberBoardId, body.memberId]
        return await dbTransactionConnection(createMemberBoardContentsSql, createMemberBoardContentsParams)
    },
}