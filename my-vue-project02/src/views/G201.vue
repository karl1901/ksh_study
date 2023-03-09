<template>
  <div>
    <div>{{ title }}</div>

    <div id="container01"></div>
  </div>
</template>

<script>
export default {
  name: 'G201',
  data() {
    return {
      title: 'G2页面一',
    };
  },
  computed: {},
  mounted() {
    this.loadContainer01();
  },
  methods: {
    loadContainer01() {
      const chart = new this.$g2.Chart({
        container: 'container01',
        autoFit: true,
      });

      chart
        .interval()
        .data([
          { genre: '小明', sold: 275 },
          { genre: '小张', sold: 115 },
          { genre: '张三', sold: 120 },
          { genre: '李四', sold: 350 },
          { genre: '王五', sold: 150 },
        ])
        .encode('x', 'genre')
        .encode('y', 'sold')
        .encode('color', 'genre');

      chart.render();
    },
  },
  created() {},
};
</script>

<style>
#container01 {
  display: flex;
  margin: 1rem;
  width: 500px;
  height: 400px;
}
</style>
