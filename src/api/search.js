import request from '../utils/request'

// 获取搜索建议'
export const getSuggestion = (q) => {
  return request.get('/app/v1_0/suggestion', {
    params: {
      q
    }
  })
}
// 获取搜索结果
export const getSearchResults = ({
  page, // 页数
  perPage, // 每页数量
  q // 搜索关键字

}) => {
  console.log(q)
  return request.get('/app/v1_0/search', {
    params: {
      page: page,
      per_page: perPage,
      q: q
    }
  })
}
