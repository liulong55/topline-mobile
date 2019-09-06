<template>
  <van-dialog v-model="show" :showConfirmButton="false"
    closeOnClickOverlay>
    <van-cell-grounp v-show="!showReports">
        <van-cell title="不感兴趣"></van-cell>
         <van-cell title="反感垃圾内容" is-link @click='showReports=true'></van-cell>
          <van-cell title="拉黑作者"></van-cell>
    </van-cell-grounp>
    <!-- 举报文章 -->
      <van-cell-grounp v-show="showReports">
          <van-cell  icon="arrow-left" @click="showReports=false"></van-cell>
        <van-cell title="标题夸张"></van-cell>
         <van-cell title="低俗色情"></van-cell>
          <van-cell title="错别字多"></van-cell>
    </van-cell-grounp>
  </van-dialog>
</template>

<script>
export default {
  name: 'MoreAction',
  data () {
    return {
      show: true,
      showReports: false
    }
  }
}
</script>

<style>
</style>
