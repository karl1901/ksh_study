<template>
  <div>
    <div class="titles">{{ title }}</div>

    <div class="btns">
      <div>
        <el-button v-for="(r, index) in routes" :key="index" type="primary" plain @click="pushRouter(r.path)">{{ r.name }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../router/index';
export default {
  name: 'Home',
  data() {
    return {
      title: '可视化学习项目首页',
      routes: [],
    };
  },
  mounted() {},
  computed: {},
  methods: {
    pushRouter(val) {
      this.$router.push(val);
    },
    loadRoutes() {
      this.routes = router.options.routes;
    },
  },
  created() {
    this.loadRoutes();
  },
};
</script>

<style>
.titles {
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 1.3rem;
  letter-spacing: 3px;
  padding: 1rem 0rem;
}

.btns {
  display: flex;
  justify-content: center;
  margin: 1rem 0rem;
}

.btns > div {
  display: flex;
}

.btns > div .el-button {
  display: flex;
  width: 100%;
  justify-content: center;
  text-align: center;
  margin: 1rem 0.5rem;
}
</style>
