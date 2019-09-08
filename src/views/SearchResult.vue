<template>
<div>
    <van-nav-bar
  title="搜索结果"
  left-text="返回"
  left-arrow
  fixed
  @click-left="$router.back()"
/>
<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <van-cell
    v-for="item in list"
    :key="item"
    :title="item"
  />
</van-list>
</div>
</template>

<script>
export default {
  name: 'SearchResult',
  props: ['q'],
  data () {
    return {
      list: [],
      finished: false,
      loading: false
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
    }
  }
}
</script>

<style lang='less' scoped>
    .van-list{
        margin-top: 46px;
    }
</style>
