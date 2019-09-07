<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar title="首页" fixed />
    <!-- 频道列表 -->
    <van-tabs animated v-model="activeIndex">
      <!-- 遍历标签页,显示频道列表 -->
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <!-- 下拉刷新 -->
        <van-pull-refresh
          v-model="currentChannel.pullLoading"
          @refresh="onRefresh"
          :success-text="success"
        >
          <!-- 文章列表,不同的频道有不同的列表 -->
          <van-list
            v-model="currentChannel.loading"
            :finished="currentChannel.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="item in currentChannel.articled"
              :key="item.art_id.toString()"
              :title="item.title"
            >
              <div slot="label">
                <!-- grid 显示封面
                  article.cover.type   0 没有图片   1 1个图片 3 3个图片
                -->
                <van-grid v-if="item.cover.type" :border="false" :column-num="3">
                  <van-grid-item v-for="(img,index) in item.cover.images" :key="img+index">
                    <van-image lazy-load height="80" :src="img" >
                      <template  v-slot:loading>
                          <!-- 图片的加载提醒 -->
                          <van-loading type="spinner" size="20" />
                      </template>
                       <!-- 自定义加载失败提示 -->
                      <template v-slot:error>加载失败</template>
                    </van-image>
                  </van-grid-item>
                </van-grid>
                <p>
                  <!-- 作者,评论数量,评论时间 -->
                  <span>{{item.aut_name}}</span>&nbsp;
                  <span>{{item.comm_count}}</span>&nbsp;
                  <span>{{item.pubdate |fmtDate}}</span>&nbsp;
                  <!-- 点击×按钮,记录当前的文章对象 -->
                  <van-icon name="cross" class="close" @click="handleAction(item)" />
                </p>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <!-- 弹出层组件-moreAction -->
     <more-action @handleSuccess='handleSuccess' v-if="currentArticle" :article='currentArticle' v-model="showMoreAction"></more-action>
     <!-- 底部弹出层 -->
     <channel-Edit></channel-Edit>
  </div>
</template>

<script>
import { getchannels } from '../../api/channel'
import { getArticles } from '../../api/article'
import Vue from 'vue'
import { Lazyload } from 'vant'
import { getItem, setItem } from '../../utils/localStorage'
import MoreAction from '../home/components/MoreAction'
import channelEdit from '../home/components/ChannelEdit' // 加载弹出层组件
// options 为可选参数，无则不传
Vue.use(Lazyload)
export default {
  name: 'home',
  components: {
    MoreAction, // 弹出层组件
    channelEdit // 底部弹出层组件
  },
  data () {
    return {
      channels: [], // 储存请求获取到的频道列表
      activeIndex: 0, // 通过该index,可以找到当前的频道对象 ,v-m是tab默认的tab索引
      success: '', // 下拉更新完毕之后显示，成功的提示
      showMoreAction: false,
      currentArticle: null // 点击×的时候,记录的当前文章对象
    }
  },
  methods: {
    async onLoad () {
      // 发送请求,获取当前频道对象
      const data = await getArticles({
        channelId: this.currentChannel.id, // 频道的id
        timestamp: this.currentChannel.timestamp || Date.now(), // 时间撮
        withTop: 1 // 是否包含置顶1,0不包括
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
      let channels = []
      // 1.如果用户登录,发送请求,获取数据
      if (this.$store.state.user) {
        const data = await getchannels()
        channels = data.channels
      } else {
        // 2.如果用户没有登录,先去本地储存中获取数据,如果没有数据再次发送请求
        // 如果本地储存中没有值,获取的是null
        channels = getItem('channels')
        if (!channels) {
          const data = await getchannels()
          channels = data.channels
          // 储存到本地储存中
          setItem('channels', channels)
        }
      }
      // 给所有的频道设置,事件搓和文章数组
      // console.log(data)
      channels.forEach(channel => {
        channel.timestamp = null
        channel.articled = []
        // 上拉加载
        channel.loading = false
        channel.finished = false
        // 下拉刷新
        channel.pullLoading = false
      })
      this.channels = channels
      //   console.log(this.channels)
    },
    // 下拉加载更多
    async onRefresh () {
      // 发送请求,获取当前频道对象
      const data = await getArticles({
        channelId: this.currentChannel.id,
        timestamp: Date.now(), // 下拉刷新是当前的时间撮
        withTop: 1
      })
      // 把数组放到数组的最前面(最新数据)
      this.currentChannel.articled.unshift(...data.results)
      this.success = `加载了${data.results.length}条数据`
      // 设置加载完成
      this.currentChannel.pullLoading = false
    },
    // 这是把点击×的时候传过去个对象,点击×按钮,弹出MoreAction,并且记录对应的文章对象
    handleAction (article) {
      this.showMoreAction = true
      this.currentArticle = article
    },
    // more-action组件中操作成功执行的方法
    handleSuccess () {
      this.showMoreAction = false // 隐藏
      // 去掉当前的文章数据
      // 找到当前文章在数组中的索引
      // findindex()查找第一个满足条件的元素的索引
      const articles = this.currentChannel.articled
      const index = articles.findIndex((item) => {
        return item.art_id === this.currentArticle.art_id
      })
      // 删除指定位置的元素
      articles.splice(index, 1)
    }
  },
  computed: {
    // 计算属性,返回当前的频道对象
    currentChannel () {
      return this.channels[this.activeIndex]
    }
  },
  watch: {
    showMoreAction () {
      console.log(this.showMoreAction)
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
    right: 15px;
    z-index: 100;
  }
  /deep/ .van-tabs__content {
    margin-top: 90px;
    margin-bottom: 50px;
  }
}
.close {
  float: right;
}
</style>
