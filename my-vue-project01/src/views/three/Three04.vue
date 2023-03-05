<template>
  <div></div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
export default {
  name: 'Test',
  data() {
    return {
      title: 'Three04',
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
      control: null
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

      // 循环生成网格模型
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          this.mesh = new THREE.Mesh(geometry, material);
          this.mesh.position.set(200 * i, 0, 200 * j);
          this.scene.add(this.mesh);
        }
      }

      // 创建三位坐标轴
      this.axesHelper = new THREE.AxesHelper(400);
      // 把坐标轴添加到场景
      this.scene.add(this.axesHelper);

      // 定义相机画布尺寸
      const width = window.innerWidth;
      const height = window.innerHeight;
      // 创建一个透视投影相机(角度，画布比例，近端面，远端面)
      this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 8000);
      // 设置相机的位置
      this.camera.position.set(3000, 3000, 3000);
      // 设置相机的观察点坐标
      this.camera.lookAt(1000, 0, 1000);

      // 创建一个WebGL渲染器
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(width, height);
      // 把渲染结果添加到页面上
      document.body.appendChild(this.renderer.domElement);

      // 创建轨道控制器
      this.control = new OrbitControls(this.camera, this.renderer.domElement);
      // 设置控制器中心
      this.control.target.set(1000, 0, 1000);
      // 更新
      this.control.update();
    },
    animat() {
      // 渲染循环(周期性执行，默认每秒60次)
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
