<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar title="登录" />
    <!-- 俩输入框 -->
    <van-cell-group>
      <van-field
       v-model="user.mobile"
        v-validate="'required|digits:11'"
        name='mobile'
        clearable
        :error-message="errors.first('mobile')"
        placeholder="请输入手机号"
         left-icon="phone-o" />
      <van-field
       v-model="user.code"
         v-validate="'required|digits:6'"
        name='code'
        :error-message="errors.first('code')"
        placeholder="请输入验证码"
         left-icon="star-o">
          <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
      <div class="login-btn">
        <van-button
         class="btn"
         :loading='loading'
        loading-text="登录中..."
        loading-type="spinner"
        type="info"
           @click="handleLogin">登录</van-button>
      </div>
  </div>
</template>

<script>
// 使用简单写法
import { mapMutations } from 'vuex'
import { login } from '../../api/user'

export default {
  name: 'login',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      loading: false
    }
  },
  created () {
    // 配置VeeValidate的自定义验证信息  这个在VeeValidate中的错误信息中找
    const dict = {
      // 验证的文本框
      custom: {
        mobile: {
          // 验证规则失败之后的提升信息
          required: '请输入手机号码',
          digits: '手机号码必须是11位的数字'

        },
        code: {
          required: '请输入验证码',
          digits: '验证码必须是6位的数字'
        }
      }
    }

    // or use the instance method
    this.$validator.localize('custom', dict)
  },
  methods: {
    // 点击按钮,处理登录
    // 把状态写成简单写法
    ...mapMutations(['setUser']),
    async  handleLogin () {
      this.loading = true
      try {
        // data就是接口返回数据中的data(因为响应拦截器做了处理)
        // const data = await login(this.user)
        // console.log(data)
        // // 储存登录的状态 1.vuex   这个data是令牌
        // // this.$store.commit('setUser', data)  //这是麻烦写法
        // this.setUser(data) // 这是简短写法
        // // 2.本地储存,都是在store完成的

        // // 跳转到首页
        // this.$router.push('/')
        // // 登录成功弹框
        // this.$toast.success('登录成功')

        // 表单验证
        const valid = await this.$validator.validate()
        // 验证失败
        if (!valid) {
          this.loading = false
          return
        }
        // 验证成功
        const data = await login(this.user)
        this.setUser(data)
        this.$router.push('/')
        this.$toast.success('登录成功')
      } catch (error) {
        console.log(error)
        // 登录失败弹框
        this.$toast.fail('登录失败')
      }
      this.loading = false
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
