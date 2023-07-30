//MARK: - Modules
const mypageModel = require('../models/mypagemodel');

//MARK: - Exports Business Logic
module.exports = {
    /**
     * @author 오기용
     * @description 프로필 불러오기(닉네임, 사진, 모닥불 개수, 랭킹)
     */
    profile: async (req) => {
        console.log("service 입니다.");
        return await mypageModel.profile(req);
    },

    /**
     * @author 오기용
     * @description 프로필 수정
     */
    update: async (req) => {
        console.log("service 입니다.");
        return await mypageModel.update(req);
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
        console.log("service 입니다.");
        return await mypageModel.secede();
    },


    /**
     * @author 오기용
     * @description 캠핑존 찜한 캠핑장 목록 불러오기
     */
    mycampingzone: async (req) => {
        console.log("service 입니다.");
        return await mypageModel.mycampingzone(req);
    },

    /**
     * @author 오기용
     * @description 체크리스트 불러오기
     */
    checkList: async (req) => {
        console.log("service 입니다.");
        return await mypageModel.checkList(req);
    },

    /**
     * @author 오기용
     * @description 체크리스트 편집(추가, 삭제)
     */
    editCheckList: async () => {
        console.log("service 입니다.");
        return await mypageModel.editCheckList();
    },


    /**
     * @author 오기용
     * @description 내가 쓴 게시물 목록 불러오기
     */
    myBoardList: async (searchBoard) => {
        console.log("service 입니다.");
        return await mypageModel.myBoardList(req);
    },

    /**
     * @author 오기용
     * @description 내가 쓴 게시물 상세 보기, 내가 댓글 단 게시물 상세 보기
     */
    myBoardDetail: async (req) => {
        console.log("service 입니다.");
        return await mypageModel.myBoardDetail(req);
    },

    /**
     * @author 오기용
     * @description 내가 댓글 단 게시물 목록 불러오기
     */
    myCommentList: async (req) => {
        console.log("service 입니다.");
        return await mypageModel.myCommentList(req);
    },

    /**
     * @author 오기용
     * @description 내가 모닥불을 준 게시물 목록 불러오기
     */
    giveFireList: async (req) => {
        console.log("service 입니다.");
        return await mypageModel.giveFireList(req);
    },


    /**
     * @author 오기용
     * @description FAQ 목록 불러오기
     */
    faqList: async (req) => {
        console.log("service 입니다.");
        return await mypageModel.faqList(req);
    },

    /**
     * @author 오기용
     * @description FAQ 상세 보기
     */
    faqDetail: async (req) => {
        console.log("service 입니다.");
        return await mypageModel.faqDetail(req);
    },

    /**
     * @author 오기용
     * @description 내가 한 질문 목록 불러오기
     */
    qnaList: async (req) => {
        console.log("service 입니다.");
        return await mypageModel.qnaList(req);
    },


    /**
     * @author 오기용
     * @description 내가 한 질문 상세 보기
     */
    qnaDetail: async (req) => {
        console.log("service 입니다.");
        return await mypageModel.qnaDetail(req);
    }
}