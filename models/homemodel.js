//MARK: - Modules
const {dbTransactionConnection, dbConnection} = require("../config/mysqlconfig")

//MARK: - Exports
module.exports = {
    /**
     * @author 이영재
     * @description Best Camper 상위 5명 조회
     */
    getBestCamper: async () => {
        console.log("-----Best Camper Model.-----")
        let selectBestCamperSql = "SELECT id, nickName, `rank`, totalFire FROM member WHERE secede = ? and ban = ? ORDER BY `rank` LIMIT ?;"
        let selectBestCamperParams = [0, 0, 5]
        return await dbConnection(selectBestCamperSql, selectBestCamperParams)
    },

    /**
     * @author 이영재
     * @description Best Camper 리스트 조회
     */
    getBestCamperList: async () => {
        console.log("-----Best Camper List Model.-----")
        let selectBestCamperListSql = "SELECT id, nickName, `rank`, totalFire FROM member WHERE secede = ? and ban = ? ORDER BY `rank`;"
        let selectBestCamperListParams = [0, 0]
        return await dbConnection(selectBestCamperListSql, selectBestCamperListParams)
    },

    /**
     * @author 이영재
     * @description 최근 핫 게시물 상위 5개 조회
     */
    hotContents: async () => {
        console.log("-----Hot Contents Model.-----")
        let selectHotContentsSql = "SELECT 1 as type, mb.id, title, date, mb.nickName, hotDate FROM memberBoardContents mb, member m WHERE m.id = mb.memberId and m.secede = ? and m.ban = ? and hotContents = ? and isDelete = ?" +
            " UNION SELECT 2 as type, db.id, title, date, db.nickName, hotDate FROM defaultBoardContents db, member m WHERE m.id = db.memberId and m.secede = ? and m.ban = ? and hotContents = ? and isDelete = ? ORDER BY hotDate DESC LIMIT ?;"
        let selectHotContentsParams = [0, 0, 1, 0, 0, 0, 1, 0, 5]
        return await dbConnection(selectHotContentsSql, selectHotContentsParams)
    },

    /**
     * @author 이영재
     * @description 핫 게시물 리스트 조회
     */
    hotContentsList: async () => {
        console.log("-----Hot Contents List Model.-----")
        let selectHotContentsListSql = "SELECT 1 as type, mb.id, title, date, mb.nickName, hotDate, fireCount FROM memberBoardContents mb, member m WHERE m.id = mb.memberId and m.secede = ? and m.ban = ? and hotContents = ? and isDelete = ?" +
            " UNION SELECT 2 as type, db.id, title, date, db.nickName, hotDate, fireCount FROM defaultBoardContents db, member m WHERE m.id = db.memberId and m.secede = ? and m.ban = ? and hotContents = ? and isDelete = ? ORDER BY hotDate DESC;"
        let selectHotContentsListParams = [0, 0, 1, 0, 0, 0, 1, 0]
        return await dbConnection(selectHotContentsListSql, selectHotContentsListParams)
    },

    /**
     * @author 이영재
     * @description 사용자 게시판 핫 게시물 상세 내용 조회
     */
    memberHotContentsDetail: async (id) => {
        console.log("-----Member Hot Contents Detail Model.-----")
        let selectMemberHotContentsDetailSql = "SELECT * FROM memberBoardContents mb, memberBoardComments mbm, member m WHERE m.id = mb.memberId and m.secede = ? and m.ban = ? and mb.id = ? and mb.isDelete = ? and mb.id = mbm.memberBoardContentsId and mbm.isDelete = ?;"
        let selectMemberHotContentsDetailParams = [0, 0, id, 0, 0]
        return await dbConnection(selectMemberHotContentsDetailSql, selectMemberHotContentsDetailParams)
    },

    /**
     * @author 이영재
     * @description 기본 게시판 핫 게시물 상세 내용 조회
     */
    defaultHotContentsDetail: async (id) => {
        console.log("-----Default Hot Contents Detail Model.-----")
        let selectDefaultHotContentsDetailSql = "SELECT * FROM defaultBoardContents db, defaultBoardComments dbm, member m WHERE m.id = db.memberId and m.secede = ? and m.ban = ? and db.id = ? and db.isDelete = ? and db.id = dbm.defaultBoardContentsId and dbm.isDelete = ?;"
        let selectDefaultHotContentsDetailParams = [0, 0, id, 0]
        return await dbConnection(selectDefaultHotContentsDetailSql, selectDefaultHotContentsDetailParams)
    },

    /**
     * @author 이영재
     * @description 내가 올린 게시물 최근 5개 조회
     */
    myContents: async (memberId) => {
        console.log("-----My Contents Model.-----")
        let selectMyContentsSql = "SELECT mb.id, title, date, mb.nickName FROM memberBoardContents mb, member m WHERE m.id = mb.memberId and m.secede = ? and m.ban = ? and memberId = ? and isDelete = ? ORDER BY date DESC LIMIT ?;"
        let selectMyContentsParams = [0, 0, memberId, 0, 5]
        return await dbConnection(selectMyContentsSql, selectMyContentsParams)
    },
}