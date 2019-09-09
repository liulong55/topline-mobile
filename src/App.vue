<template>
  <div id="app">
    <!-- <keep-alive> 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们 -->
      <!-- include - 字符串或正则表达式。只有名称匹配的组件会被缓存。
exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
max - 数字。最多可以缓存多少组件实例。 -->
    <keep-alive exclude="Detail">
     <router-view/>
    </keep-alive>
  </div>
</template>

<style lang="less">

</style>
