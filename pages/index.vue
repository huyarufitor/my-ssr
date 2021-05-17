<template>
  <div class="container">
    <div>
      <h1>这是一个nuxt项目，从这里你将进入一个神奇的世界</h1>
    </div>
    <div>
      <div>
        <button>fitor开发者社区</button>
      </div>
      <div class="mavonEditor">
        <no-ssr>
      <mavon-editor :toolbars="markdownOption" v-model="handbook"/>
        </no-ssr>
  </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      markdownOption: {
        bold: true, // 粗体
      },
      handbook: "#### how to use mavonEditor in nuxt.js"
    };
  }
};
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
  .mavonEditor {
  width: 100%;
  height: 100%;
}
</style>
