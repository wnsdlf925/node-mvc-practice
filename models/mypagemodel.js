//MARK: - Modules
const {dbTransactionConnection, dbConnection} = require("../config/mysqlconfig");

//MARK: - Exports
/** 10.12
 * 검색은 본문하지 말고 제목만하기로
 * 검색 설정은 FULLTEXT로
 * 페이징 X
 */
module.exports = {

    /**
     * @author 오기용
     * @description 프로필 불러오기(닉네임, 사진, 모닥불 개수, 랭킹), 마이페이지 메인 / 수정 전에 사용
     */
    profile: async (req) => {
        console.log("model 입니다.");
        let profileSql = 'SELECT id, nickName, totalFire, `rank` FROM member JOIN memberRefreshToken ON member.id=memberRefreshToken.memberId WHERE memberRefreshToken.refreshToken=?;';
        let profileParams = [req.body.refreshToken];
        return await dbConnection(profileSql, profileParams);
    },

    /**
     * @author 오기용
     * @description 프로필 수정
     */
    update: async (req) => {
        // 사진 수정은 어떻게할지. → cdn 경로 변경
        console.log("model 입니다.");
        let updateSql = 'UPDATE member SET nickName=? WHERE id=?;';
        let updateParams = [req.body.nickName, req.body.id];
        return await dbTransactionConnection(updateSql, updateParams);
    },

    /**
     * @author 오기용
     * @description 로그아웃 -> memberauthrouter/sign-out 사용
     */

    /**
     * @author 오기용
     * @description 회원탈퇴
     */
    secede: async () => {
        console.log("model 입니다.");
        let secedeSql = 'UPDATE member set secede=?, secedeDateTime=DATE_ADD(NOW(), INTERVAL 9 HOUR) WHERE nickname=?;';
        let secedeParams = [1, "ChulSu"];
        return await dbTransactionConnection(secedeSql, secedeParams);
    },

    /**
     * @author 오기용
     * @description 캠핑존 찜한 캠핑장 목록 불러오기
     */
    mycampingzone: async (req) => {
        console.log("model 입니다.");
        let mycampingzoneSql = 'SELECT subscribedCampingZone FROM member WHERE id=?;';
        let mycampingzoneParams = [req.body.id];
        return await dbConnection(mycampingzoneSql, mycampingzoneParams);
    },

    /**
     * @author 오기용
     * @description 체크리스트 불러오기
     */
    checkList: async (req) => {
        console.log("model 입니다.");
        let checkListSql = 'SELECT checkListTitle, checkList FROM campingCheckList WHERE memberId=?;';
        let checkListParams = [req.body.id];
        return await dbConnection(checkListSql, checkListParams);
    },

    /**
     * @author 오기용
     * @description 체크리스트 편집(추가, 삭제)
     */
    editCheckList: async () => {
        console.log("model 입니다.");
        /**
         * 디폴트 값 주고, 프론트에서는 안보이게
         */
        let editCheckListSql = ';';
        let editCheckListParams = [];
        return await dbConnection(editCheckListSql, editCheckListParams);
    },


    /**
     * @author 오기용
     * @description 내가 쓴 게시물 목록 불러오기
     */
    myBoardList: async (req) => {
        console.log("model 입니다.");

        let myBoardListSql;
        let myBoardListParams;

        // 일반 목록 쿼리
        if (req.query.title == undefined) {
            myBoardListSql = 'SELECT * FROM memberBoardContents WHERE memberId=? AND isDelete=0;'
            myBoardListParams = [req.body.id];
        }
        // 검색 목록 쿼리
        else if (req.query.title != undefined) {
            myBoardListSql = 'SELECT * FROM memberBoardContents WHERE memberId=? AND isDelete=? AND MATCH(title) AGAINST(? IN boolean mode);';
            myBoardListParams = [req.body.id, 0, req.query.title];
        }

        return await dbConnection(myBoardListSql, myBoardListParams);
    },


    /**
     * @author 오기용
     * @description 내가 쓴 게시물 상세 보기, 내가 댓글 단 게시물 상세 보기
     */
    myBoardDetail: async (req) => {
        console.log("model 입니다.");
        // db에 데이터 아직 안넣음.
        let myBoardDetailSql = 'SELECT * FROM memberBoardContents WHERE id=?';
        let myBoardDetailParams = [req.params.id];
        return await dbConnection(myBoardDetailSql, myBoardDetailParams);
    },


    /**
     * @author 오기용
     * @description 내가 댓글 단 게시물 목록 불러오기
     */
    myCommentList: async (req) => {
        console.log("model 입니다.");

        let myCommentListSql;
        let myCommentListParams;

        // 일반 목록 쿼리
        if (req.query.title == undefined) {
            myCommentListSql = 'SELECT * FROM memberBoardContents WHERE isDelete=0 AND (SELECT memberBoardContentsId FROM memberBoardComments WHERE memberId=? AND isDelete=0);';
            myCommentListParams = [req.body.id];
        }
        // 검색 목록 쿼리
        else if (req.query.title != undefined) {
            myCommentListSql = 'SELECT * FROM memberBoardContents WHERE MATCH(title) AGAINST(? IN boolean mode) AND isDelete=0 AND (SELECT memberBoardContentsId FROM memberBoardComments WHERE memberId=? AND isDelete=0);';
            myCommentListParams = [req.query.title, rqe.body.id];
        }
        return await dbConnection(myCommentListSql, myCommentListParams);
    },


    /**
     * @author 오기용
     * @description 내가 모닥불을 준 게시물 목록 불러오기
     */
    giveFireList: async (req) => {
        console.log("model 입니다.");

        /**10.12
         * AqueryTool 결제하고 확인해봐야함
         */
        let giveFireListSql;
        let giveFireListParams;

        // 일반 목록 쿼리
        if (req.query.title == undefined) {
            giveFireListSql = 'SELECT giveFireList FROM member WHERE id=?';
            giveFireListParams = [req.body.id];
        }
        // 검색 목록 쿼리
        else if (req.query.title != undefined) {
            giveFireListSql = 'SELECT giveFireList FROM member WHERE id=?';
            giveFireListParams = [];
        }
        return await dbConnection(giveFireListSql, giveFireListParams);
    },


    /**
     * @author 오기용
     * @description FAQ 목록 불러오기
     */
    faqList: async (req) => {
        console.log("model 입니다.");

        let faqListSql;
        let faqListParams;

        // 일반 목록 쿼리
        if (req.query.title == undefined) {
            faqListSql = 'SELECT * FROM faq WHERE isDelete=0;';
            faqListParams = [];
        }
        // 검색 목록 쿼리
        else if (req.query.title != undefined) {
            faqListSql = 'SELECT * FROM faq WHERE isDelete=0 AND MATCH(title) AGAINST(? IN boolean mode);';
            faqListParams = [req.query.title];
        }
        return await dbConnection(faqListSql, faqListParams);
    },

    /**
     * @author 오기용
     * @description FAQ 상세 보기
     */
    faqDetail: async (req) => {
        confaq.log("model 입니다.");

        let faqDetailSql = 'SELECT * FROM faq WHERE id=?';
        let faqDetailParams = [req.params.id];
        return await dbConnection(faqDetailSql, faqDetailParams);
    },

    /**
     * @author 오기용
     * @description 내가 한 질문 목록 불러오기
     */
    qnaList: async (searchBoard) => {
        confaq.log("model 입니다.");

        let qnaListSql;
        let qnaListParams;

        // 일반 목록 쿼리
        if (req.query.title == undefined) {
            qnaListSql = 'SELECT * FROM qna WHERE isDelete=0 AND memberId=?;';
            qnaListParams = [req.body.id];
        }
        // 검색 목록 쿼리
        else if (req.query.title != undefined) {
            qnaListSql = 'SELECT * FROM qna WHERE isDelete=0 AND memberId=? AND MATCH(title) AGAINST(? IN boolean mode);';
            qnaListParams = [req.body.id, req.query.title];
        }
        return await dbConnection(qnaListSql, qnaListParams);
    },


    /**
     * @author 오기용
     * @description 내가 한 질문 상세 보기
     */
    qnaDetail: async (req) => {
        confaq.log("model 입니다.");

        let qnaDetailSql = 'SELECT * FROM qna WHERE id=?';
        let qnaDetailParams = [req.params.id];
        return await dbConnection(qnaDetailSql, qnaDetailParams);
    }
}
