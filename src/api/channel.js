/**
 *
 * 频道相关请求模块
 */
import request from '../utils/request'
/**
 * 获取默认推荐/用户频道列表
 */
export const getchannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
// 获取所有频道
export const getAllChannels = () => {
  return request.get('/app/v1_0/channels')
}
// 删除用户的指定频道
export const deleteChannel = (id) => {
  return request.delete(`/app/v1_0/user/channels/${id}`)
}
// 添加用户指定频道
export const addChannel = (id, seq) => {
  return request.patch('/app/v1_0/user/channels', {
    channels: [
      {
        id,
        seq
      }
    ]
  })
}
