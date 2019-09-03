import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import Vant from 'vant' // 导入组件库
import VeeValidate, { Validator } from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN' // 导入中文包
import 'vant/lib/index.css'
import '../src/styles/index.less'
Vue.use(Vant)
Vue.use(VeeValidate)// 配置插件VeeValidate
Validator.localize('zh_CN', zhCN) // 配置中文
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
