import axios from 'axios'
import JSONbig from 'json-bigint'
import store from '../store/index' // 把状态里的token令牌引入
import router from '@/router'
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
  // 注入token令牌
  if (store.state.user) { // 这个user里有俩令牌,这里我们用token
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
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
}, async function (error) {
  // 判断状态码是否是401,error里有
  if (error.response.status === 401) {
    // 如果是401,使用refresh_token交换新的token
    const refreshToken = store.state.user.refresh_token
    try {
      const response = await axios({
        method: 'put',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      })
      // 新的2小时可用的token
      const token = response.data.data.token
      // 储存新的token
      store.commit('setUser', {
        token: token,
        refresh_token: refreshToken
      })
      // 重新发送上一次401的请求
      return instance(error.config)
    } catch (error) {
      // 跳转到首页
      // 如果refresh_token过期,跳转到登录页面
      router.push('/login')
    }
  }
  return Promise.reject(error)
})

export default instance
