// 本地储存的封装
// 存
export const setItem = (key, item) => {
  // key是定义的值,item是值,把他转为字符串
  window.localStorage.setItem(key, JSON.stringify(item))
}
// 取
export const getItem = (key) => {
  // 转为js代码
  return JSON.parse(window.localStorage.getItem(key))
}
// 删
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}
