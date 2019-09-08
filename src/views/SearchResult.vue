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
    :key="item.art_id.toString()"
    :title="item.title"
  />
</van-list>
</div>
</template>

<script>
import { getSearchResults } from '../api/search'
export default {
  name: 'SearchResult',
  props: ['q'],
  data () {
    return {
      list: [],
      finished: false,
      loading: false,
      page: 1,
      perPage: 10
    }
  },
  methods: {
    async onLoad () {
      // 获取搜索结果
      const data = await getSearchResults({
        page: this.page,
        perPage: this.perPage,
        q: this.q
      })
      // 把获取的结果push到数组中    ,这个是个数组,所以解构进去
      this.list.push(...data.results)
      this.page++
      this.loading = false
      // 判断是否加载完
      if (data.results.length === 0) {
        this.finished = true
      }
    }
  }
}
</script>

<style lang='less' scoped>
    .van-list{
        margin-top: 46px;
    }
</style>
