<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
      title="文章详情"
      left-text="返回"
      fixed
      @click-left="$router.back()"
    />
     <div class="article" v-if="article">
      <!-- 文章标题 -->
      <h2 class="article-title">{{article.title}}</h2>
      <!-- 作者信息 -->
      <author-info :article='article'></author-info>
      <!-- 文章内容 -->
      <div class="article-content" v-html="article.content">
      </div>
      <!-- 点赞和取消 -->
      <more-action :article='article'></more-action>
      <!-- 评论列表 -->
      <comment-list :isArticle='true' :id="article.art_id.toString()"></comment-list>
    </div>
  </div>
</template>

<script>
import { getArticle } from '../../api/article'
import AuthorInfo from '../detail/component/AuthoInfo' // 加载作者信息组件
import MoreAction from '../detail/component/MoreAction' // 加载更多操作
import CommentList from '../detail/component/CommentList'// 加载评论列表
export default {
  components: {
    AuthorInfo,
    MoreAction,
    CommentList
  },
  name: 'Detail',
  props: ['id'],
  data () {
    return {
      article: null
    }
  },
  methods: {
    // 获取文章详情
    async getwenz () {
      try {
        const data = await getArticle(this.id)
        this.article = data
      } catch (error) {
        this.$toast.fail('获取文章详情失败')
      }
    }
  },
  created () {
    this.getwenz()
  }
}
</script>

<style lang="less" scoped>
.article {
  margin-top: 48px;
  padding: 0px 20px;
  .article-title {
    font-size: 20px;
    font-weight: bold;
  }
  .article-content {
    font-size: 14px;
  }
}
</style>
