<template>
  <div class="container">

      <!-- 路由
            约定式 
                展示区：<nuxt/>
                声明式跳转：<nuxt-link to="{name:'product-id',params:{id:3},query:{a:111,b:222}}"">商品3</nuxt-link>
                    name:路由名  目录名-其他目录-文件名
                    params:key 要对等文件名
                子路由:目录代表子路由，子路由内部同级的文件，代表的是一级路由
            配置
       -->
    <div>
      <h1>欢迎大家，这里是属于我的博客系统，在这里你可以学习到一些html\css\js、ts、python的一些知识
      </h1>
      <nuxt-link to="/blog/1?a=1&b=2">html页面</nuxt-link>
      <nuxt-link to="/blog/2?a=11&b=22">css页面</nuxt-link>
      <nuxt-link to="/blog/3?a=111&b=222">JavaScript页面</nuxt-link>
      <!--  -->
      <nuxt-link to="/blog/comment">评论</nuxt-link>
      <nuxt-link :to="{name:'blog-id',params:{id:4},query:{a:1111,b:2222}}">typescript</nuxt-link>
      <!-- 动态的路由，params传过来的id是数字，其他的三个是字符串;因为前者是 以对象的形式，后者是拼字符串的形式-->
      <!-- 没有约定子路由的展示区，下面是code -->
      <nuxt/>
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
