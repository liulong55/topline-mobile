<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar title="首页" fixed />
    <!-- 频道列表 -->
    <van-tabs animated>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getchannels } from '../../api/channel'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      channels: [] // 储存请求获取到的频道列表
    }
  },
  methods: {
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
    // 渲染频道列表
    async loadingchannels () {
      const data = await getchannels()
      this.channels = data.channels
      //   console.log(this.channels)
    }
  },
  created () {
    // 加载频道列表
    this.loadingchannels()
  }
}
</script>

<style lang='less' scoped>
// 列出组件和深度作用选择器
// 在scoped中书写的样式，动态生成的标签或者子组件中不可用
// 深度作用选择器   /deep/
.van-tabs {
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    z-index: 100;
  }
  /deep/ .van-tabs__content {
    margin-top: 90px;
    margin-bottom: 50px;
  }
}
</style>
