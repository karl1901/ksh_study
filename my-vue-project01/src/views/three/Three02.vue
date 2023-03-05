<template>
  <div>
    <div id="con"></div>
  </div>
</template>

<script>
import * as THREE from 'three';
// 引入相机控件
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
export default {
  name: 'Three02',
  data() {
    return {
      title: 'Three02',
      // 三维场景
      scene: null,
      // 构造器
      mesh: null,
      // 三维坐标轴,
      axesHelper: null,
      // 灯光(点)
      light: null,
      // 灯光源(点)
      lightHelper: null,
      // 灯光(环境)
      ambienLight: null,
      // 灯光(平行)
      directionalLight: null,
      // 灯光源(平行)
      directionalLightHelper: null,
      // 相机
      camera: null,
      // 渲染器
      renderer: null,
      // 控制器
      controls: null
    };
  },
  mounted() {
    this.init();
    this.animate();
  },
  computed: {},
  methods: {
    init() {
      // 创建一个场景
      this.scene = new THREE.Scene();

      // 定义一个长方体，(长宽高)
      let geometry = new THREE.BoxGeometry(100, 100, 100);
      // 创建一个材质对象
      let material = new THREE.MeshLambertMaterial({
        color: '#f8f8f2'
      });

      // 创建网格模型(物体)
      this.mesh = new THREE.Mesh(geometry, material);
      // 设置物体位置
      this.mesh.position.set(0, 0, 0);
      // 添加到场景
      this.scene.add(this.mesh);

      // 创建三位坐标轴
      this.axesHelper = new THREE.AxesHelper(200);
      // 添加到场景
      this.scene.add(this.axesHelper);

      // 创建灯光(点)
      this.light = new THREE.PointLight('#f1fa89', 1);
      // 设置灯光位置
      this.light.position.set(200, 200, 200);
      // 添加到场景
      // this.scene.add(this.light);

      // 创建灯光(环境)
      this.ambienLight = new THREE.AmbientLight('#f1fa89', 0.3);
      // 添加到场景
      // this.scene.add(this.ambienLight);

      // 创建灯光源辅助物(灯光，辅助物大小)
      this.lightHelper = new THREE.PointLightHelper(this.light, 10);
      // 添加到场景
      // this.scene.add(this.lightHelper);

      // 创建灯光(平行)
      this.directionalLight = new THREE.DirectionalLight('#f1fa89', 0.5);
      // 设置位置
      this.directionalLight.position.set(200, 80, 200);
      // 添加到场景
      this.scene.add(this.directionalLight);

      // 创建灯光辅助物(灯光，平面尺寸)
      this.directionalLightHelper = new THREE.DirectionalLightHelper(
        this.directionalLight,
        10
      );
      // 添加到场景
      this.scene.add(this.directionalLightHelper);

      // 定义相机画布尺寸
      const width = 800;
      const height = 500;
      // 创建一个透视投影相机(角度，画布比例，近端面，远端面)
      this.camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 3000);
      // 设置相机的位置
      this.camera.position.set(400, 300, 400);
      // 设置相机的观察点坐标
      this.camera.lookAt(this.mesh.position);

      // 创建一个WebGL渲染器
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(width, height);
      // 渲染场景
      this.renderer.render(this.scene, this.camera);
      // 把渲染结果添加到页面上
      document.getElementById('con').appendChild(this.renderer.domElement);

      // 创建相机控件对象(要控制的相机，控制范围的元素)
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    },
    animate() {
      requestAnimationFrame(this.animate);
      // 渲染场景
      this.renderer.render(this.scene, this.camera);
    }
  },
  created() {}
};
</script>

<style>
body {
  overflow: hidden;
}

#con {
  display: flex;
  min-width: 100vw;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
}
</style>
