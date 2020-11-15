<template>
  <div class="container">
    <div>
      <h1>这是一个nuxt项目，从这里你将进入一个神奇的世界</h1>
    </div>
    <div>
      <el-button><nuxt-link :to="{name:'/pages/blog'}">taka博客系统</nuxt-link></el-button>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
