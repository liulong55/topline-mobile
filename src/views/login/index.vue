<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar title="登录" />
    <!-- 俩输入框 -->
    <van-cell-group>
      <van-field v-model="user.mobile" placeholder="请输入手机号" left-icon="phone-o" />
      <van-field v-model="user.code" placeholder="请输入验证码" left-icon="star-o">
          <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
      <div class="login-btn">
        <van-button class="btn" type="info" @click="handleLogin">登录</van-button>
      </div>
  </div>
</template>

<script>
import { login } from '../../api/user'
export default {
  name: 'login',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    async  handleLogin () {
      try {
        const res = await login(this.user)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
  }

}
</script>

<style lang='less' scoped>
.login-btn{
    padding: 20px;
    .btn{
        width: 100%;
    }
}
</style>
