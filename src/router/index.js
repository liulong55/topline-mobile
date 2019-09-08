import Vue from 'vue'
import Router from 'vue-router'
import tabbar from '../views/tabbar.vue'
import home from '../views/home/index.vue'
import wq from '../views/answers/index.vue'
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
        },
        {
          path: '/wq',
          component: wq
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '../views/login/index.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue')
    },
    {
      path: '/search-result/:q',
      name: 'search-result',
      // 路由跳转的时候,对应的组件把动态路由参数,传递给组件
      props: true,
      component: () => import(/* webpackChunkName: "search-result" */ '../views/SearchResult.vue')
    }
  ]
})
