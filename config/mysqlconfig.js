//MARK: - Modules
const {successRequest, errorRequest} = require('../config/responseformat');
let mysql = require('mysql')
require('dotenv').config()

//MARK: - Properties, Methods
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    dateStrings: 'date',
    multipleStatements: true,
    connectionLimit: 80
})

/**
 * @author 오기용
 * @description Transaction 연결 시(insert, update)
 */
getTransactionConnection = async (querySql, queryParams) => {
    return new Promise((resolve, reject) => {
        connection.getConnection(function (error, conn) {
            if (!error) {
                conn.beginTransaction(function (error) {
                    if (error) {
                        console.log("Transaction 에러" + error);
                        conn.release()
                        errorRequest.payload = error;
                        resolve(errorRequest)

                    } else {
                        console.log("db 연결성공");
                        conn.query(querySql, queryParams, function (error, rows) {
                            if (!error) {
                                conn.commit(); // 에러가 없으면 commit()을 통해 db에 변경사항 적용
                                conn.release();
                                successRequest.payload = rows;
                                resolve(successRequest);
                            } else {
                                conn.rollback(); // 에러 발생 시 rollback()을 통해 db에 적용안함.
                                conn.release();
                                errorRequest.payload = error;
                                resolve(errorRequest);
                            }
                        })
                    }
                })
            } else {
                console.log("db 연결실패");
                errorRequest.payload = error;
                resolve(errorRequest);
            }
        })
    })
}

/**
 * @author 오기용
 * @description 일반 db 연결 시(select)
 */
getConnection = async (querySql, queryParams) => {
    return new Promise((resolve, reject) => {
        connection.getConnection(function (error, conn) {
            console.log("db 연결성공");
            conn.query(querySql, queryParams, function (error, rows) {
                if (!error) {
                    conn.release();
                    successRequest.payload = rows
                    resolve(successRequest);
                } else {
                    conn.release();
                    errorRequest.payload = error
                    resolve(errorRequest);
                }
            })

        })
    })
}

//MARK: - Exports
module.exports = {'dbTransactionConnection': getTransactionConnection, 'dbConnection': getConnection};

