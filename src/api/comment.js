import request from '../utils/request'
export const getComments = ({
  isArticle, // 源id,文章id或评论id
  source, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
  offset, // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量]
  limit
}) => {
  return request.get('/app/v1_0/comments', {
    params: {
    // a文章的评论,c评论的评论
      type: isArticle ? 'a' : 'c',
      source,
      offset,
      limit
    }
  })
}
