import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    // 通过mutations改变状态,把登录页的token等存进来
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {

  }
})
