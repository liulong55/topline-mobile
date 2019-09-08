<template>
<div>
    <van-nav-bar
  title="搜索结果"
  left-text="返回"
  left-arrow
  @click-left="$router.back()"
/>
{{q}}
</div>
</template>

<script>
export default {
  name: 'SearchResult',
  props: ['q']
}
</script>

<style>

</style>
