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
