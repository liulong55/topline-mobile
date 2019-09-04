import Vue from 'vue'
import Router from 'vue-router'
import tabbar from '../views/tabbar.vue'
import home from '../views/home/index.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: tabbar,
      children: [
        {
          path: '',
          name: 'home',
          component: home
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '../views/login/index.vue')
    }
  ]
})
