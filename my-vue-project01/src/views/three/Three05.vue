<template>
  <div></div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
export default {
  name: 'Three05',
  data() {
    return {
      title: 'Three05',
      scene: null,
      axesHelper: null,
      camera: null,
      renderer: null,
      control: null,
      geometry: null
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

      // 空白集合体对象
      this.geometry = new THREE.BufferGeometry();

      // 顶点数据
      let vertices = new Float32Array([
        0, 0, 0, 50, 0, 0, 0, 100, 0, 0, 0, 10, 0, 0, 100, 50, 0, 10
      ]);

      // 创建属性缓冲区对象(顶点数据，每3个一组)
      let attribute = new THREE.BufferAttribute(vertices, 3);
      // 设置几何体位置
      this.geometry.attributes.position = attribute;

      // 创建点材质
      let material = new THREE.PointsMaterial({
        color: '#50d94c',
        size: 10.0
      });

      // 创建点模型
      let points = new THREE.Points(this.geometry, material);
      this.scene.add(points);

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
      this.camera.lookAt(0, 0, 0);

      // 创建一个WebGL渲染器
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(width, height);
      // 把渲染结果添加到页面上
      document.body.appendChild(this.renderer.domElement);

      // 创建轨道控制器
      this.control = new OrbitControls(this.camera, this.renderer.domElement);
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
  created() {}
};
</script>
