<template>
  <van-dialog :showConfirmButton="false"
    closeOnClickOverlay :value='value' @input="$emit('input',$event)">
    <van-cell-group v-show="!showReports">
        <van-cell title="不感兴趣" icon="location-o" @click="handle('dislike')"/>
         <van-cell title="反感垃圾内容" icon="location-o" is-link @click='showReports=true'/>
          <van-cell title="拉黑作者" icon="location-o" @click="handle('blacklist')"/>
    </van-cell-group>
    <!-- 举报文章 -->
      <van-cell-group v-show="showReports">
          <van-cell  icon="arrow-left" @click="showReports=false"/>
        <van-cell title="标题夸张"/>
         <van-cell title="低俗色情"/>
          <van-cell title="错别字多"/>
    </van-cell-group>
  </van-dialog>
</template>

<script>
import { dislikeArticle } from '../../../api/article'
export default {
  name: 'MoreAction',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    // 接收父组件传递的文章对象
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showReports: false
    }
  },
  methods: {
    // 点击所有cell的时候,都执行方法
    // 通过type判断具体要执行的操作
    handle (type) {
      switch (type) {
        case 'dislike':
          // 不感兴趣
          this.dislike()
          break
        case 'blacklist':

          break
      }
    },
    // 不感兴趣
    async dislike () {
      try {
        await dislikeArticle(this.article.art_id)
        this.$toast.success('操作成功')
        // 通知父组件,隐藏弹出栏,删掉当前点击的文章
        this.$emit('handleSuccess')
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>

<style>
</style>
