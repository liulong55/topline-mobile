import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import Vant from 'vant' // 导入组件库
import VeeValidate, { Validator } from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN' // 导入中文包
import 'vant/lib/index.css'
import '../src/styles/index.less'
import { fmtDate } from './utils/dayjs' // 时间包
Vue.use(Vant)
Vue.use(VeeValidate, {
  // 文本框中触发验证的事件，默认是input
  // 如果为空的话，文本框输入过程中不验证，需要调用validate方法验证
  events: ''
})// 配置插件VeeValidate
Validator.localize('zh_CN', zhCN) // 配置中文
Vue.config.productionTip = false
// 获取相对时间的过滤器
Vue.filter('fmtDate', fmtDate)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
