<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar title="登录" />
    <!-- 俩输入框 -->
    <van-cell-group>
      <van-field v-model="value" placeholder="请输入手机号" left-icon="phone-o" />
      <van-field v-model="value" placeholder="请输入验证码" left-icon="star-o">
          <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
      <div class="login-btn">
        <van-button class="btn" type="info">登录</van-button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'login'
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
