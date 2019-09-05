import request from '../../src/utils/request'
/**
 * 获取文章列表（登录和不登录）
 * @param {*} 参数 channel_id,timestamp,with_top
 */

export const getArticles = ({
  // 频道的id
  channelId,
  // 时间戳
  timestamp,
  // 是否包含置顶1，0不包含
  withTop
}) => {
  return request.get('/app/v1_1/articles', {
    params: {
      channel_id: channelId,
      timestamp,
      with_top: withTop
    }
  })
}
