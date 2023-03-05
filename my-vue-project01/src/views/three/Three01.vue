<template>
  <div>
    <div id="con"></div>
  </div>
</template>

<script>
import * as THREE from 'three';
export default {
  name: 'Three01',
  data() {
    return {
      title: 'Three01',
      // 三维场景
      scene: null,
      // 构造器
      mesh: null,
      // 三维坐标轴,
      axesHelper: null,
      // 相机
      camera: null,
      // 渲染器
      renderer: null
    };
  },
  mounted() {
    this.init();
  },
  computed: {},
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
      this.mesh.position.set(0, 0, 0);
      // 把物体添加到场景
      this.scene.add(this.mesh);

      // 创建三位坐标轴
      this.axesHelper = new THREE.AxesHelper(200);
      // 把坐标轴添加到场景
      this.scene.add(this.axesHelper);

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
      this.renderer.render(this.scene, this.camera);
      // 把渲染结果添加到页面上
      document.getElementById('con').appendChild(this.renderer.domElement);
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
