import request from '../utils/request'

/**
 *
 * @param{*}登录提交服务器的数据,mobile,code
 *
 */

// 导出去这个
// export const login = ({ mobile, code }) => request.post('/app/v1_0/authorizations', { mobile, code })
export const login = ({
  mobile,
  code
}) => {
  return request.post('/app/v1_0/authorizations', { mobile, code })
}
// export const login = function (data) {

//     return request.post('/url',{mobile:data.mobile,code:data.code})
// }

// 拉黑作者,id,作者的id
export const blacklists = (id) => {
  return request.post('/app/v1_0/user/blacklists', {
    target: id
  })
}
