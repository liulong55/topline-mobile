import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import Vant from 'vant' // 导入组件库
import VeeValidate from 'vee-validate'
import 'vant/lib/index.css'
import '../src/styles/index.less'
Vue.use(Vant)
Vue.use(VeeValidate)// 配置插件VeeValidate
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
