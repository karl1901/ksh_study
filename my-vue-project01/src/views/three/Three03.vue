<template>
  <div></div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// 导入性能监视器
import Stats from 'three/examples/jsm/libs/stats.module';
export default {
  name: 'Test',
  data() {
    return {
      title: 'Three03',
      // 三维场景
      scene: null,
      // 构造器
      mesh: null,
      // 三维坐标轴,
      axesHelper: null,
      // 相机
      camera: null,
      // 渲染器
      renderer: null,
      // 控制器
      control: null,
      // 性能监视器
      stats: null
    };
  },
  mounted() {
    this.init();
    this.animat();
    this.autoCanvas();
  },
  methods: {
    init() {
      // 创建一个场景
      this.scene = new THREE.Scene();

      // 定义一个长方体，(长宽高)
      let geometry = new THREE.BoxGeometry(100, 100, 100);
      // 创建一个材质对象
      let material = new THREE.MeshBasicMaterial({
        color: '#50fa7b',
        // 开启透明
        transparent: true,
        // 透明度
        opacity: 0.5
      });

      // 创建网格模型(物体)
      this.mesh = new THREE.Mesh(geometry, material);
      // 设置物体位置
      this.mesh.position.set(200, 150, 100);
      // 把物体添加到场景
      this.scene.add(this.mesh);

      // 创建三位坐标轴
      this.axesHelper = new THREE.AxesHelper(400);
      // 把坐标轴添加到场景
      this.scene.add(this.axesHelper);

      // 定义相机画布尺寸
      const width = window.innerWidth;
      const height = window.innerHeight;
      // 创建一个透视投影相机(角度，画布比例，近端面，远端面)
      this.camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 3000);
      // 设置相机的位置
      this.camera.position.set(900, 900, 900);
      // 设置相机的观察点坐标
      this.camera.lookAt(this.mesh.position);

      // 创建一个WebGL渲染器
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(width, height);
      // 把渲染结果添加到页面上
      document.body.appendChild(this.renderer.domElement);

      // 创建轨道控制器
      this.control = new OrbitControls(this.camera, this.renderer.domElement);

      // 创建性能监视器对象
      this.stats = new Stats();
      // 插入元素内
      document.body.appendChild(this.stats.domElement);
    },
    animat() {
      // 渲染循环(周期性执行，默认每秒60次)
      // 更新监听器
      this.stats.update();
      // 旋转模型
      this.mesh.rotateY(0.02);
      // 渲染模型
      this.renderer.render(this.scene, this.camera);
      // 渲染下一帧(再次执行渲染函数)
      requestAnimationFrame(this.animat);
    },
    autoCanvas() {
      // 窗口大小发生变化时调用
      let app = this;
      window.onresize = function () {
        // 重置渲染器画布尺寸
        app.renderer.setSize(window.innerWidth, window.innerHeight);
        // 重置相机观察范围比例
        app.camera.aspect = window.innerWidth / window.innerHeight;
        // 更新相机投影矩阵
        app.camera.updateProjectionMatrix();
      };
    }
  },
  created() {
    // 打印签名
    console.log('%c好好学习，天天向上!', this.$getCssText('consoleFontStyle'));
  }
};
</script>

<style>
body {
  margin: 0px;
  overflow: hidden;
}
</style>
