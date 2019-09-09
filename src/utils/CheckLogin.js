// 插件:就是一个对象,具有install(vue,options)
export default {
  install (Vue) {
    // 给vue的实例增加方法
    Vue.prototype.$checkLogin = function () {
      // this是vue的实例  this.$checkLogin()
      // 判断是否登录
      if (!this.$store.state.user) {
        // 如果没有登录,提醒用户是否登录
        this.$dialog.confirm({
          title: '登录提醒',
          message: '是否要跳转到登录页面'
        }).then(() => {
          // 点击确认按钮,跳到登录页面
          this.$router.push('/login')
        }).catch(() => {
          // on cancel //点击取消执行
        })
        return false
      }
      return true
    }
  }
}
