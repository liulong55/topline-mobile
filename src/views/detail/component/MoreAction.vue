<template>
    <div class="more-action">
        <!-- 用户对文章的态度,-1无态度,0不喜欢,1点赞 -->
    <van-button
      :icon="article.attitude===1? 'star':'star-o'"
      round
      :loading="false"
      type="danger"
      @click="handleLike"
    >点赞</van-button>

    <van-button
      icon="delete"
      round
      :loading="false"
      type="danger"
    >不喜欢</van-button>
  </div>
</template>

<script>
import { likeArticle, unLikeArticle } from '../../../api/article'
export default {
  props: ['article'], // 从主页带过来的
  methods: {
    // 点赞和取消点赞
    async handleLike () {
      // 判断是否登录
      if (!this.$checkLogin()) {
        return // 没登录直接停
      }
      try {
        // 点赞或者取消点赞
        if (this.article.attitude === 1) {
          // 当前已经点赞,取消点赞
          await unLikeArticle(this.article.art_id)
          this.article.attitude = -1
        } else {
          // 1是无态度
          await likeArticle(this.article.art_id)
          this.article.attitude = 1
        }
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>

<style lang='less' scoped>
    .more-action{
        padding: 20px;
        display:flex;
        justify-content: space-around;
    }
</style>
