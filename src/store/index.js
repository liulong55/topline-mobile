import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    // 通过mutations改变状态
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {

  }
})
