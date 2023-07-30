//MARK: - Modules
const {dbTransactionConnection, dbConnection} = require("../config/mysqlconfig")

//MARK: - Exports
module.exports = {

   

     /**
     * @author 권준일
     * @description 관리자 로그인
     */
      login: async (name) => {
        
        let adminListSql = "SELECT * FROM campers_test.admin where name = ? ;"
        let adminListParams = [name];
        return await dbConnection(adminListSql, adminListParams);
    },
    

    /**
     * @author 권준일
     * @description 관리자 가입
     */
    signUp: async (name,password) => {
       
    let adminListSql = "INSERT INTO campers_test.admin(name,password) VALUE(?,?);"
    let adminListParams = [name,password];
    return await dbTransactionConnection(adminListSql, adminListParams);
},
}