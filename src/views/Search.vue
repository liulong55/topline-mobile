<template>
  <div>
      <!-- 搜索框 -->
        <van-search
    v-model="value"
    placeholder="请输入搜索关键词"
    show-action
    @search="onSearch(value)"
    @cancel="onCancel"
    @input="handleInput"
     background="#3e9df8"
  />
  <!-- 搜索提示 -->
  <van-cell-group v-show="value">
  <van-cell @click="onSearch(item)" v-for="item in suggestionList" :key="item" icon="search" >
    <div slot="title" v-html="highlight(item)"></div>
  </van-cell>
  </van-cell-group>

  <!-- 历史记录 -->
      <van-cell-group v-show="!value">
      <van-cell title="历史记录">
        <!-- 自定义右侧内容 -->
        <div v-show="isEdit" style="display:inline-block">
          <span>全部删除</span>&nbsp;
          <span @click="isEdit=false">完成</span>&nbsp;
        </div>
           <van-icon v-show="!isEdit" @click="isEdit=true" name="delete" size="18px" />
      </van-cell>
      <van-cell @click="onSearch(item)" v-for="(item,index) in histories" :key="item" :title="item">
        <!-- 自定义右侧内容 -->
        <van-icon v-show="isEdit" @click="handleDelete(index)" name="close" size="18px" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestion } from '../api/search'
import { mapState } from 'vuex'
import * as storageTools from '../utils/localStorage'
import _ from 'lodash'
export default {
  name: 'Search',
  data () {
    return {
      value: '',
      // 储存搜索建议
      suggestionList: [],
      isEdit: false, // 编辑模式
      histories: [] // 历史记录
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onSearch (value) {
      // 跳转到搜索结果页面
      this.$router.push({
        name: 'search-result',
        params: {
          q: value
        }
      })
      // 判断histories中是否已经存在item
      if (this.histories.includes(value)) {

      } else {
        // 记录搜索历史
        this.histories.push(value)
        // 判断用户是否登录
        if (this.user) {
          // 发送请求
        } else {
          // 没有登录,把历史记录储存到本地储存
          storageTools.setItem('history', this.histories)
        }
      }
    },
    onCancel () {},
    // 在文本框输入的过程中获取搜索提示
    handleInput: _.debounce(async function () {
      if (this.value.length === 0) {
        /// 判断是否为空
        return
      }
      try {
        const data = await getSuggestion(this.value)
        this.suggestionList = data.options
      } catch (error) {
        console.log(error)
      }
    }, 300),
    // 点击历史记录的删除按钮
    handleDelete (index) {
      this.histories.splice(index, 1)
      storageTools.setItem('history', this.histories)
    },
    // 高亮显示搜索建议中的匹配内容
    highlight (item) {
      // item是提醒项目
      // 创建个正则
      const reg = new RegExp(this.value, 'gi')
      return item.replace(reg, `<span style="color:red">${this.value}</span>`)
    }
  },
  created () {
    // 加载历史记录
    if (this.user) {
      // 从服务器获取数据

    } else {
      // 没有登录,从本地储存获取数据
      this.histories = storageTools.getItem('history') || []
    }
  }
}
</script>

<style>

</style>
