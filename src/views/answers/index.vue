<template>
  <div>
      <!-- 导航头 -->
      <!-- 导航头 -->
    <van-nav-bar title="问答" @click-left="home" left-text="回主页"/>
  </div>
</template>

<script>
export default {
  methods: {
    home () {
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
