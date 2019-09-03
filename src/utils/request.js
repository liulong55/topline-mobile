import axios from 'axios'
import JSONbig from 'json-bigint'
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})
instance.defaults.transformResponse = [function (data) {
  try {
    // data 数据可能不是标准的 JSON 格式字符串，否则会导致 JSONbig.parse(data) 转换失败报错
    return JSONbig.parse(data)
  } catch (err) {
    // 无法转换的数据直接原样返回
    return data
  }
}]

// 请求拦截器
instance.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(function (response) {
//   console.log(response)
// 接口返回的数据中都有data,在此处统一返回接口返回的data
// 如果接口返回的数据中没有data,此时返回axios响应对象data属性 ,这是为了直接取那俩返回值token
  return response.data.data || response.data
}, function (error) {
  return Promise.reject(error)
})

export default instance
