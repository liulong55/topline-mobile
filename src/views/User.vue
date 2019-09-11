<template>
  <div>
    <div class="not-login">
      <div class="circle" @click="handleLogin">
        <span>登录</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',
  methods: {
    // 点击登陆按钮,跳转到登录页面
    handleLogin () {
      this.$router.push({
        path: '/login',
        query: {
          redirect: this.$route.fullPath
        }
      })
    }
  }
}
</script>

<style lang="less">
.not-login {
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  .circle {
    width: 50px;
    height: 50px;
    padding: 20px;
    background-color: red;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 20px;
  }
}
</style>
