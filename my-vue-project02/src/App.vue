<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      title: 'app',
    };
  },
  mounted() {},
  computed: {},
  methods: {},
  created() {
    console.log('%c报错不用管,代码能跑就行', this.$getCssText('myConsoleStyles'));
  },
};
</script>

<style>
/* 导入index.css */
@import url('./css/index.css');
</style>
