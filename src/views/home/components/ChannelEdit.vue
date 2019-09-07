<template>
    <van-popup
  v-model="show"
  position="bottom"
  :style="{ height: '80%' }"
/>
</template>

<script>
export default {
  name: 'ChannelEdit',
  data () {
    return {
      show: true
    }
  }
}
</script>

<style>

</style>
