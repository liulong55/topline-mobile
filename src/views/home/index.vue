<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar title="首页" />
    <!-- 频道列表 -->
    <van-tabs animated>
  <van-tab v-for="index in 8" :title="'标签 ' + index" :key="index">
    内容 {{ index }}
  </van-tab>
</van-tabs>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
