<template>
    <van-popup
  position="bottom"
  :value='value'
  @input="$emit('input',$event)"
  :style="{ height: '80%' }"
>
    <van-cell icon="cross" @click="$emit('input', false)"/>
    <!-- 我的频道 -->
    <van-cell title="我的频道" label="点击进入频道">
      <van-button
        round
        type="danger"
        size="mini"
        v-show="!isEdit"
        @click="isEdit=true"
      >编辑</van-button>
        <van-button
        round
        type="danger"
        size="mini"
          v-show="isEdit"
        @click="isEdit=false"
      >完成</van-button>
    </van-cell>
    <van-grid>
        <!-- 我的频道 -->
      <van-grid-item
        v-for="(channel,index) in channels"
        :key="channel.id"
        :text="channel.name"
        @click="handleMyChannelItem(index,channel.id)"
      >
       <div slot="text" class="van-grid-item__text" :class="{ active: active === index }" >
          {{ channel.name }}
        </div>
      <!-- 关闭按钮 -->
        <van-icon
          slot="icon"
          class="close-icon"
          name="close"
          v-show="isEdit && index !==0"
        />
      </van-grid-item>
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell title="推荐频道" label="点击添加频道" />
    <van-grid>
      <van-grid-item
      @click="handleChannelItem(item)"
        v-for="item in recommendChannels"
        :key="item.id"
        :text="item.name"
      />
    </van-grid>
</van-popup>
</template>

<script>
import { getAllChannels, deleteChannel, addChannel } from '../../../api/channel'
import { mapState } from 'vuex'
import { setItem } from '../../../utils/localStorage'
export default {
  name: 'ChannelEdit',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    // 接收父组件传过来的我的频道
    channels: {
      type: Array,
      required: true
    },
    // 接收当前显示的频道的索引
    active: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState(['user']),
    // 推荐频道
    recommendChannels () {
      // 1. 获取我的频道中所有id组成的数组
      // map() 遍历数组，返回一个新的数组，新数组中的元素由回调函数中返回的元素组成
      const ids = this.channels.map((channel) => {
        return channel.id
      })
      // 2.过滤所有频道,把频道id出现在上面数组中的项去除
      // filter(),把满足条件的item,返回组成一个新的数组
      return this.allChannels.filter((channel) => {
        // includes()   es6新增，判断数组中是否包含某一项
        return !ids.includes(channel.id)
      })
    }
  },
  data () {
    return {
      // 是否是编辑模式
      isEdit: false,
      // 存储所有频道
      allChannels: []
    }
  },
  methods: {
    // 加载所有的频道列表
    async loadAllChannels () {
      try {
        const data = await getAllChannels()
        this.allChannels = data.channels
      } catch (error) {
        console.log(error)
      }
    },
    // 点击我的频道的时候
    async  handleMyChannelItem (index, channelId) {
      // 1.非编辑模式
      if (!this.isEdit) {
        // 告诉父组件,选中的频道的索引
        // 关闭对话框
        this.$emit('activeChange', index)
      } else {
        // 判断当前激活项的索引,是否是数字中的最后一个
        if (this.active === this.channels.length - 1) {
          this.$emit('last')
        }

        // 2.编辑模式
        // 2.1把点击的频道,从我的频道移除
        this.channels.splice(index, 1)
        // 2.2判断是否登录
        // 通过mapstate做了映射
        if (this.user) {
          // 2.3如果登录,发生请求
          try {
            await deleteChannel(channelId)
          } catch (error) {
            this.$toast.fail('操作失败')
          }
        } else {
          // 2.4没有登录,把频道列表记录到本地储存中
          setItem('channels', this.channels)
        }
      }
    },
    // 点击推荐频道的时候
    async handleChannelItem (channel) {
      // 1.把channel添加到我的频道
      this.$set(channel, 'timestamp', null)
      this.$set(channel, 'articles', [])
      this.$set(channel, 'loading', false)
      this.$set(channel, 'finished', false)
      this.$set(channel, 'pullLoading', false)
      console.log(this.channels)
      this.channels.push(channel)
      // 2.判断是否登录
      if (this.user) {
        // 3.如果登录,发生请求
        await addChannel(channel.id, this.channels.length)
      } else {
        // 4.没有登录,把我的频道储存到本地储存中
        setItem('channels', this.channels)
      }
    }
  },
  created () {
    // 加载所有的频道列表
    this.loadAllChannels()
  }
}
</script>

<style lang='less' scoped>
.close-icon {
  position: absolute;
  right: 0;
  top: 0;
}
.active{
    color: red
}
</style>
