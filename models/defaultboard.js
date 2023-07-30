//MARK: - Modules
const {dbTransactionConnection, dbConnection} = require("../config/mysqlconfig")

//MARK: - Exports
module.exports = {

    /**
     * @author 권준일
     * @description 기본 게시판 생성
     */
    createDefaultBoard: async (name) => {
        let createDefaultBoardSql = "INSERT INTO campers_test.defaultBoard(name,isDelete) VALUE(?,0);"
        let createDefaultBoardParams = [name];
        return await dbTransactionConnection(createDefaultBoardSql, createDefaultBoardParams);
    },

    /**
     * @author 권준일
     * @description 기본 게시판 중복확인
     */

    duplDefaultBoard: async (name) => {
        let duplDefaultBoardSql = "select * from campers_test.defaultBoard where name = ? and isDelete = 0;"
        let duplDefaultBoardParams = [name];
        return await dbConnection(duplDefaultBoardSql, duplDefaultBoardParams);
    },

    /**
     * @author 권준일
     * @description 기본 게시판 출력
     */

    defaultBoardList: async () => {
        let defaultBoardListSql = "select * from campers_test.defaultBoard where isDelete = 0;"
        let defaultBoardListParams = [];
        return await dbConnection(defaultBoardListSql, defaultBoardListParams);
    },

    /**
     * @author 권준일
     * @description 기본 게시판 삭제
     */

    deleteDefaultBoard: async (id) => {
        let deleteDefaultBoardSql = "update campers_test.defaultBoard set isDelete = 1 where id = ?;"
        let deleteDefaultBoardParams = [id];
        return await dbTransactionConnection(deleteDefaultBoardSql, deleteDefaultBoardParams);
    }

}