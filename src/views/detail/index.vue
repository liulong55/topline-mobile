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
      <!-- 发布评论 -->
      <send-comment :target='article.art_id.toString()' :isArticle='true'></send-comment>
      <!-- 加载评论回复的组件,触发事件但不在这 -->
      <reply-list v-model="showReplyList"></reply-list>
    </div>
  </div>
</template>

<script>
import { getArticle } from '../../api/article'
import AuthorInfo from '../detail/component/AuthoInfo' // 加载作者信息组件
import MoreAction from '../detail/component/MoreAction' // 加载更多操作
import CommentList from '../detail/component/CommentList'// 加载评论列表
import SendComment from '../detail/component/SendComment' // 加载发布评论组件
import ReplyList from '../detail/component/ReplyList' // 加载评论回复的组件
import { mapState } from 'vuex'
export default {
  components: {
    AuthorInfo,
    MoreAction,
    CommentList,
    SendComment,
    ReplyList
  },
  name: 'Detail',
  props: ['id'],
  data () {
    return {
      article: null
    }
  },
  computed: {
    ...mapState(['showReplyList'])
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
// .article {
//   margin-top: 48px;
//   padding: 0px 20px;
//   .article-title {
//     font-size: 20px;
//     font-weight: bold;
//   }
//   .article-content {
//     font-size: 14px;
//   }
// }
.article {
  // 当内容超出容器的宽度，强制换行
  word-break: break-all;
  word-wrap: break-word;
  white-space: pre-wrap;
  margin-top: 92px;
  padding: 0px 20px;
  margin-bottom: 124px;

  .article-title {
    font-size: 40px;
    font-weight: bold;
  }
  .article-content {
    font-size: 26px;
  }
  .article-content /deep/ code, .article-content /deep/ pre {
    overflow: scroll;
    margin: 0px 2px;
    padding: .5em;
    font-size: 14px;
    color: rgb(131,148,150);
    line-height: 18px;
    font-family: Consolas, Inconsolata, Courier, monospace;
    display: block;
    word-spacing: 0px;
    letter-spacing: 0px;
    background: rgb(0,43,54);
  }
}

</style>
