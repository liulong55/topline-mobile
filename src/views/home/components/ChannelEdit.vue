<template>
    <van-popup
  position="bottom"
  :value='value'
  @input="$emit('input',$event)"
  :style="{ height: '80%' }"
/>
</template>

<script>
export default {
  name: 'ChannelEdit',
  props: {
    value: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style>

</style>
