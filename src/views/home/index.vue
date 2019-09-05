<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar title="首页" fixed />
    <!-- 频道列表 -->
    <van-tabs animated v-model="activeIndex">
      <!-- 遍历标签页,显示频道列表 -->
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="currentChannel.isLoading" @refresh="onRefresh">
        <!-- 文章列表,不同的频道有不同的列表 -->
        <van-list v-model="currentChannel.loading" :finished="currentChannel.finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in currentChannel.articled" :key="item.art_id.toString()" :title="item.title" />
        </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getchannels } from '../../api/channel'
import { getArticles } from '../../api/article'
export default {
  data () {
    return {
      channels: [], // 储存请求获取到的频道列表
      activeIndex: 0 // 通过该index,可以找到当前的频道对象 ,v-m是tab默认的tab索引
    }
  },
  methods: {
    async onLoad () {
      // 发送请求,获取当前频道对象
      const data = await getArticles({
        channelId: this.currentChannel.id,
        timestamp: this.currentChannel.timestamp || Date.now(),
        withTop: 1
      })
      console.log(data)
      // 记录文章列表,记录最后一条数据的事件搓
      this.currentChannel.timestamp = data.pre_timestamp
      this.currentChannel.articled.push(...data.results)
      this.currentChannel.loading = false
      if (data.results.length === 0) {
        this.currentChannel.finished = true
      }
    },
    // 渲染频道列表
    async loadingchannels () {
      const data = await getchannels()
      // 给所有的频道设置,事件搓和文章数组
      console.log(data)
      data.channels.forEach((channel) => {
        channel.timestamp = null
        channel.articled = []
        // 上拉加载
        channel.loading = false
        channel.finished = false
        // 下拉刷新
        channel.isLoading = false
      })
      this.channels = data.channels
      //   console.log(this.channels)
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.currentChannel.isLoading = false
        this.count++
      }, 500)
    }
  },
  computed: {
    // 计算属性,返回当前的频道对象
    currentChannel () {
      return this.channels[this.activeIndex]
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
