<template>
  <div>
    <router-view></router-view>
<van-tabbar route>
  <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
  <van-tabbar-item to="/bq" icon="search">问答</van-tabbar-item>
  <van-tabbar-item to="/sp" icon="friends-o">视频</van-tabbar-item>
  <van-tabbar-item to="/wd" icon="setting-o">我的</van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'tabbar'
}
</script>

<style>

</style>
