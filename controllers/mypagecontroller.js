//MARK: - Modules
const mypageSerice = require('../services/mypageservice');

//MARK: - Exports
module.exports = {

    /**
     * @author 오기용
     * @description 프로필 불러오기(닉네임, 사진, 모닥불 개수, 랭킹)
     */
    profile: async (req, res, next) => {
        console.log("controller 입니다.");
        res.send(await mypageSerice.profile(req));
    },

    /**
     * @author 오기용
     * @description 프로필 수정
     */
    update: async (req, res, next) => {
        console.log("controller 입니다.");
        res.send(await mypageSerice.update(req));
    },

    /**
     * @author 오기용
     * @description 로그아웃 -> memberauthrouter/sign-out 사용
     */

    /**
     * @author 오기용
     * @description 회원탈퇴
     */
    secede: async (req, res, next) => {
        console.log("controller 입니다.");
        res.send(await mypageSerice.secede());
    },

    /**
     * @author 오기용
     * @description 캠핑존 찜한 캠핑장 목록 불러오기
     */
    mycampingzone: async (req, res, next) => {
        console.log("controller 입니다.");
        res.send(await mypageSerice.mycampingzone(req));
    },

    /**
     * @author 오기용
     * @description 체크리스트 불러오기
     */
    checkList: async (req, res, next) => {
        console.log("controller 입니다.");
        res.send(await mypageSerice.checkList(req));
    },

    /**
     * @author 오기용
     * @description 체크리스트 편집(추가, 삭제)
     */
    editCheckList: async (req, res, next) => {
        console.log("controller 입니다.");
        res.send(await mypageSerice.editCheckList());
    },


    /**
     * @author 오기용
     * @description 내가 쓴 게시물 목록 불러오기
     */
    myBoardList: async (req, res, next) => {
        console.log("controller 입니다.");
        res.send(await mypageSerice.editCheckList(req));
    },

    /**
     * @author 오기용
     * @description 내가 쓴 게시물 상세 보기, 내가 댓글 단 게시물 상세 보기
     */
    myBoardDetail: async (req, res, next) => {
        console.log("controller 입니다.");
        res.send(await mypageSerice.myBoardDetail(req));
    },


    /**
     * @author 오기용
     * @description 내가 댓글 단 게시물 목록 불러오기
     */
    myCommentList: async (req, res, next) => {
        console.log("controller 입니다.");
        res.send(await mypageSerice.myCommentList(req));
    },


    /**
     * @author 오기용
     * @description 내가 모닥불을 준 게시물 목록 불러오기
     */
    giveFireList: async (req, res, next) => {
        console.log("controller 입니다.");
        res.send(await mypageSerice.giveFireList(req));
    },


    /**
     * @author 오기용
     * @description FAQ 목록 불러오기
     */
    faqList: async (req, res, next) => {
        console.log("controller 입니다.");
        res.send(await mypageSerice.faqList(req));
    },

    /**
     * @author 오기용
     * @description FAQ 상세 보기
     */
    faqDetail: async (req, res, next) => {
        console.log("controller 입니다.");
        res.send(await mypageSerice.faqDetail(req));
    },

    /**
     * @author 오기용
     * @description 내가 한 질문 목록 불러오기
     */
    qnaList: async (req, res, next) => {
        console.log("controller 입니다.");
        res.send(await mypageSerice.qnaList(req));
    },


    /**
     * @author 오기용
     * @description 내가 한 질문 상세 보기
     */
    qnaDetail: async (req, res, next) => {
        console.log("controller 입니다.");
        res.send(await mypageSerice.qnaDetail(req));
    }
}