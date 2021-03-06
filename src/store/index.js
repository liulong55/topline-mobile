import Vue from 'vue'
import Vuex from 'vuex'
import * as storageTools from '../utils/localStorage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 项目运行时,先去本地储存中过去登录状态,有就有,没有就下面登录改变时,存进去
    user: storageTools.getItem('user'),
    // 控制评论的回复组件是否显示
    showReplyList: false,
    currentComment: null
  },
  mutations: {
    // 通过mutations改变状态,把登录页的token等存进来
    setUser (state, data) {
      state.user = data

      // 把登录状态储存到本地储存中
      storageTools.setItem('user', data)
    },
    // 显示回复评论的显示隐藏
    setShowReplyList (state, isShow) {
      state.showReplyList = isShow
    },
    // 回复列表展示当前列表
    setCurrentComment (state, comment) {
      state.currentComment = comment
    }
  },
  actions: {

  }
})
