//MARK: - Properties
/**
 * @author 오기용
 * @description 요청에 대한 응답
 */
successRequest = {
    status: 200,
    payload: null,
}

errorRequest = {
    status: 400,
    payload: null
}

//MARK: - Exports
module.exports = {'successRequest': successRequest, 'errorRequest': errorRequest};
