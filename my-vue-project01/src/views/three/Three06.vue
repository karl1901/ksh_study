<template>
  <div>
    <!-- loading -->
    <dv-loading class="loadings" v-show="loading">{{ loaded }}%</dv-loading>

    <!-- 顶部部分 -->
    <div v-show="!loading" class="tops">
      <div>
        <div>
          <dv-decoration-8 />
          <dv-decoration-11>{{ title }}</dv-decoration-11>
          <dv-decoration-8 :reverse="true" />
        </div>
        <div>
          <dv-decoration-5 />
        </div>
      </div>
    </div>
    <!-- 左边部分 -->
    <div v-show="!loading" class="lefts">
      <!-- 左一 -->
      <dv-border-box-1 class="dbb1">
        <div>
          <dv-decoration-6 style="width: 30%; height: 5px" />
          <div>&nbsp;城市人口&nbsp;</div>
          <dv-decoration-6 style="width: 30%; height: 6px" />
        </div>
        <div id="chartCity"></div>
      </dv-border-box-1>
      <!-- 左二 -->
      <dv-border-box-1 class="dbb1">
        <div>
          <dv-decoration-6 style="width: 30%; height: 5px" />
          <div>&nbsp;城市降水&nbsp;</div>
          <dv-decoration-6 style="width: 30%; height: 6px" />
        </div>
        <div class="waterLevelStyles">
          <div v-for="(wlcl, index) in waterLevelConfigList" :key="index">
            <dv-water-level-pond
              :config="wlcl.waterLevelConfig"
              style="height: 100px"
            />
            <div>{{ wlcl.city }}</div>
          </div>
        </div>
      </dv-border-box-1>
      <!-- 左三 -->
      <dv-border-box-1 class="dbb1">
        <div>
          <dv-decoration-6 style="width: 30%; height: 5px" />
          <div>&nbsp;人口占比&nbsp;</div>
          <dv-decoration-6 style="width: 30%; height: 6px" />
        </div>
        <div class="pclStyles">
          <dv-active-ring-chart :config="peoConfigList" />
        </div>
      </dv-border-box-1>
    </div>
    <!-- 右边部分 -->
    <div v-show="!loading" class="rights">
      <!-- 右一 -->
      <dv-border-box-1 class="dbb1">
        <div>
          <dv-decoration-6 style="width: 30%; height: 5px" />
          <div>&nbsp;城市人口&nbsp;</div>
          <dv-decoration-6 style="width: 30%; height: 6px" />
        </div>
        <div id="jdCon"></div>
      </dv-border-box-1>
      <!-- 右二 -->
      <dv-border-box-1 class="dbb1">
        <div>
          <dv-decoration-6 style="width: 30%; height: 5px" />
          <div>&nbsp;低碳城市&nbsp;</div>
          <dv-decoration-6 style="width: 30%; height: 6px" />
        </div>
        <div class="dtCityConfigStyles">
          <dv-capsule-chart
            :config="dtCityConfigList"
            style="width: 100%; height: 160px"
          />
        </div>
      </dv-border-box-1>
      <!-- 右三 -->
      <dv-border-box-1 class="dbb1">
        <div>
          <dv-decoration-6 style="width: 30%; height: 5px" />
          <div>&nbsp;城市消费&nbsp;</div>
          <dv-decoration-6 style="width: 30%; height: 6px" />
        </div>
        <div class="cityXfConfigStyles">
          <dv-scroll-ranking-board
            :config="cityXfConfigList"
            style="width: 100%; height: 150px"
          />
        </div>
      </dv-border-box-1>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
export default {
  name: 'Three06',
  data() {
    return {
      title: '华为智慧城市可视化大屏',
      loading: false,
      loaded: 0,
      // 三维场景
      scene: null,
      // 模型加载器
      loader: null,
      // 文件加载器
      textureCubeLoader: null,
      // 加载的场景
      loaderScene: null,
      // 三维坐标轴,
      axesHelper: null,
      // 点光源
      light: null,
      // 环境光
      ambienLight: null,
      // 相机
      camera: null,
      // 渲染器
      renderer: null,
      // 控制器
      control: null,
      // 城市人口数据源
      cityPeoData: [
        {
          type: '湖南',
          value: 36
        },
        {
          type: '湖北',
          value: 34
        },
        {
          type: '深圳',
          value: 40
        },
        {
          type: '北京',
          value: 47
        },
        {
          type: '上海',
          value: 44
        },
        {
          type: '广州',
          value: 57
        }
      ],
      // 城市人口条形图对象
      chartCity: null,
      // 城市降水
      waterLevelConfigList: [
        {
          city: '北京',
          waterLevelConfig: {
            data: [55],
            shape: 'roundRect'
          }
        },
        {
          city: '上海',
          waterLevelConfig: {
            data: [33],
            shape: 'roundRect'
          }
        },
        {
          city: '武汉',
          waterLevelConfig: {
            data: [23],
            shape: 'roundRect'
          }
        }
      ],
      // 人口占比
      peoConfigList: {
        radius: '55%',
        activeRadius: '60%',
        data: [
          {
            name: '周口',
            value: 55
          },
          {
            name: '南阳',
            value: 120
          },
          {
            name: '西峡',
            value: 78
          },
          {
            name: '驻马店',
            value: 66
          },
          {
            name: '新乡',
            value: 80
          }
        ]
      },
      // 低碳城市
      dtCityConfigList: {
        data: [
          {
            name: '南阳',
            value: 167
          },
          {
            name: '周口',
            value: 67
          },
          {
            name: '漯河',
            value: 123
          },
          {
            name: '郑州',
            value: 55
          },
          {
            name: '西峡',
            value: 98
          }
        ]
      },
      // 城市消费
      cityXfConfigList: {
        data: [
          {
            name: '周口',
            value: 55
          },
          {
            name: '南阳',
            value: 120
          },
          {
            name: '西峡',
            value: 78
          },
          {
            name: '驻马店',
            value: 66
          },
          {
            name: '新乡',
            value: 80
          },
          {
            name: '信阳',
            value: 45
          },
          {
            name: '漯河',
            value: 29
          }
        ],
        unit: '万元'
      },
      // 消费趋势
      xfqsData: [
        {
          Data: '2010-01',
          sales: 1998
        },
        {
          Data: '2010-02',
          sales: 1850
        },
        {
          Data: '2010-03',
          sales: 1720
        },
        {
          Data: '2010-04',
          sales: 1818
        },
        {
          Data: '2010-05',
          sales: 1920
        },
        {
          Data: '2010-06',
          sales: 1802
        },
        {
          Data: '2010-07',
          sales: 1945
        },
        {
          Data: '2010-08',
          sales: 1856
        },
        {
          Data: '2010-09',
          sales: 2107
        },
        {
          Data: '2010-10',
          sales: 2140
        },
        {
          Data: '2010-11',
          sales: 2311
        },
        {
          Data: '2010-12',
          sales: 1972
        },
        {
          Data: '2011-01',
          sales: 1760
        },
        {
          Data: '2011-02',
          sales: 1824
        },
        {
          Data: '2011-03',
          sales: 1801
        },
        {
          Data: '2011-04',
          sales: 2001
        },
        {
          Data: '2011-05',
          sales: 1640
        },
        {
          Data: '2011-06',
          sales: 1502
        },
        {
          Data: '2011-07',
          sales: 1621
        },
        {
          Data: '2011-08',
          sales: 1480
        },
        {
          Data: '2011-09',
          sales: 1549
        },
        {
          Data: '2011-10',
          sales: 1390
        },
        {
          Data: '2011-11',
          sales: 1325
        },
        {
          Data: '2011-12',
          sales: 1250
        },
        {
          Data: '2012-01',
          sales: 1394
        },
        {
          Data: '2012-02',
          sales: 1406
        },
        {
          Data: '2012-03',
          sales: 1578
        },
        {
          Data: '2012-04',
          sales: 1465
        },
        {
          Data: '2012-05',
          sales: 1689
        },
        {
          Data: '2012-06',
          sales: 1755
        },
        {
          Data: '2012-07',
          sales: 1495
        },
        {
          Data: '2012-08',
          sales: 1508
        },
        {
          Data: '2012-09',
          sales: 1433
        },
        {
          Data: '2012-10',
          sales: 1344
        },
        {
          Data: '2012-11',
          sales: 1201
        },
        {
          Data: '2012-12',
          sales: 1065
        },
        {
          Data: '2013-01',
          sales: 1255
        },
        {
          Data: '2013-02',
          sales: 1429
        },
        {
          Data: '2013-03',
          sales: 1398
        },
        {
          Data: '2013-04',
          sales: 1678
        },
        {
          Data: '2013-05',
          sales: 1524
        },
        {
          Data: '2013-06',
          sales: 1688
        },
        {
          Data: '2013-07',
          sales: 1500
        },
        {
          Data: '2013-08',
          sales: 1670
        },
        {
          Data: '2013-09',
          sales: 1734
        },
        {
          Data: '2013-10',
          sales: 1699
        },
        {
          Data: '2013-11',
          sales: 1508
        },
        {
          Data: '2013-12',
          sales: 1680
        },
        {
          Data: '2014-01',
          sales: 1750
        },
        {
          Data: '2014-02',
          sales: 1602
        },
        {
          Data: '2014-03',
          sales: 1834
        },
        {
          Data: '2014-04',
          sales: 1722
        },
        {
          Data: '2014-05',
          sales: 1430
        },
        {
          Data: '2014-06',
          sales: 1280
        },
        {
          Data: '2014-07',
          sales: 1367
        },
        {
          Data: '2014-08',
          sales: 1155
        },
        {
          Data: '2014-09',
          sales: 1289
        },
        {
          Data: '2014-10',
          sales: 1104
        },
        {
          Data: '2014-11',
          sales: 1246
        },
        {
          Data: '2014-12',
          sales: 1098
        },
        {
          Data: '2015-01',
          sales: 1189
        },
        {
          Data: '2015-02',
          sales: 1276
        },
        {
          Data: '2015-03',
          sales: 1033
        },
        {
          Data: '2015-04',
          sales: 956
        },
        {
          Data: '2015-05',
          sales: 845
        },
        {
          Data: '2015-06',
          sales: 1089
        },
        {
          Data: '2015-07',
          sales: 944
        },
        {
          Data: '2015-08',
          sales: 1043
        },
        {
          Data: '2015-09',
          sales: 893
        },
        {
          Data: '2015-10',
          sales: 840
        },
        {
          Data: '2015-11',
          sales: 934
        },
        {
          Data: '2015-12',
          sales: 810
        },
        {
          Data: '2016-01',
          sales: 782
        },
        {
          Data: '2016-02',
          sales: 1089
        },
        {
          Data: '2016-03',
          sales: 745
        },
        {
          Data: '2016-04',
          sales: 680
        },
        {
          Data: '2016-05',
          sales: 802
        },
        {
          Data: '2016-06',
          sales: 697
        },
        {
          Data: '2016-07',
          sales: 583
        },
        {
          Data: '2016-08',
          sales: 456
        },
        {
          Data: '2016-09',
          sales: 524
        },
        {
          Data: '2016-10',
          sales: 398
        },
        {
          Data: '2016-11',
          sales: 278
        },
        {
          Data: '2016-12',
          sales: 195
        },
        {
          Data: '2017-01',
          sales: 145
        },
        {
          Data: '2017-02',
          sales: 207
        }
      ]
    };
  },
  mounted() {
    this.init();
    this.animat();
    this.autoCanvas();
  },
  methods: {
    createJdChart() {
      const chart = new this.$g2.Chart({
        container: 'jdCon',
        autoFit: true,
        height: 500
      });
      chart.data(this.xfqsData);
      chart.scale('Data', {
        range: [0, 1],
        tickCount: 10,
        type: 'timeCat'
      });
      chart.scale('sales', {
        nice: true
      });
      chart.axis('Data', {
        label: {
          style: {
            fill: '#F8F8FF'
          }
        }
      });
      chart.axis('sales', {
        label: {
          formatter: (text) => {
            return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
          },
          style: {
            fill: '#F8F8FF'
          }
        }
      });
      chart.tooltip({
        showCrosshairs: true
      });

      chart.line().position('Data*sales');
      chart.area().position('Data*sales');
      chart.render();
    },
    createCityChart() {
      // 图表配置
      this.chartCity = new this.$g2.Chart({
        container: 'chartCity',
        autoFit: true,
        height: 150
      });
      // 设置数据源
      this.chartCity.data(this.cityPeoData);
      // 设置图标度量
      this.chartCity.scale({
        value: {
          max: 100,
          min: 0,
          alias: '人数（万）'
        }
      });
      // 置换x,y轴
      this.chartCity.coordinate().transpose();
      // 坐标轴配置
      this.chartCity.axis('value', false);
      this.chartCity.axis('type', {
        label: {
          style: {
            fill: '#F8F8FF'
          }
        }
      });
      // 内容配置
      this.chartCity
        .interval()
        .position('type*value')
        .size(15)
        .label('value', {
          style: {
            fill: '#F8F8FF'
          },
          offset: 10
        });
      // 渲染图表
      this.chartCity.render();
    },
    init() {
      // 创建一个场景
      this.scene = new THREE.Scene();

      // 加载模型
      this.loadScene();

      // 天空盒
      // 盒子背景图片地址集合
      let urls = [
        '/sky/posx.jpg',
        '/sky/negx.jpg',
        '/sky/posy.jpg',
        '/sky/negy.jpg',
        '/sky/posz.jpg',
        '/sky/negz.jpg'
      ];
      // 加载图片文件
      this.textureCubeLoader = new THREE.CubeTextureLoader().load(urls);
      // 设置场景背景
      this.scene.background = this.textureCubeLoader;

      // // 创建三位坐标轴
      // this.axesHelper = new THREE.AxesHelper(400);
      // // 把坐标轴添加到场景
      // this.scene.add(this.axesHelper);

      // 创建灯光(点)
      this.light = new THREE.PointLight('#f8ebc1', 0.8);
      // 设置灯光位置
      this.light.position.set(9000, 9000, 9000);
      // 添加到场景
      this.scene.add(this.light);

      // 创建灯光(环境)
      this.ambienLight = new THREE.AmbientLight('#f8ebc1', 0.8);
      // 添加到场景
      this.scene.add(this.ambienLight);

      // 定义相机画布尺寸
      const width = window.innerWidth;
      const height = window.innerHeight;
      // 创建一个透视投影相机(角度，画布比例，近端面，远端面)
      this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
      // 设置相机的位置
      this.camera.position.set(600, 200, 600);
      // 设置相机的观察点坐标
      this.camera.lookAt(0, 0, 0);

      // 创建一个WebGL渲染器
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(width, height);
      // 把渲染结果添加到页面上
      document.body.appendChild(this.renderer.domElement);
      // 设置编码方式保持与gltf一致，解决渲染颜色偏差问题
      // this.renderer.outputEncoding = THREE.sRGBEncoding;

      // 创建轨道控制器
      this.control = new OrbitControls(this.camera, this.renderer.domElement);
    },
    animat() {
      // 渲染循环(周期性执行，默认每秒60次)
      // 加载模型旋转
      if (this.loaderScene != null) {
        this.loaderScene.rotateY(0.002);
      }
      // 渲染模型
      this.renderer.render(this.scene, this.camera);
      // 渲染下一帧(再次执行渲染函数)
      requestAnimationFrame(this.animat);
    },
    loadScene() {
      // 创建一个模型加载器
      this.loader = new GLTFLoader();
      // 加载外部模型
      this.loader.load(
        '/gltf/city.gltf',
        (gltf) => {
          // 加载完成
          this.loading = false;
          console.log('模型加载完成!', gltf);
          // 添加到场景
          this.scene.add(gltf.scene);
          // 加载的场景赋值
          this.loaderScene = gltf.scene;
          // 加载各种图表线程
          setTimeout(() => {
            this.createCityChart();
            this.createJdChart();
          }, 1000);
        },
        (xmlHttpRequest) => {
          // 加载进度
          this.loading = true;
          this.loaded = ~~(
            (xmlHttpRequest.loaded / xmlHttpRequest.total) *
            100
          );
        },
        (error) => {
          // 加载出错
          this.loading = false;
          console.error('模型加载错误:', error);
        }
      );
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
    console.log(
      '%c报错不用管，能运行就行!',
      this.$getCssText('consoleFontStyle')
    );
  }
};
</script>

<style>
body {
  margin: 0px;
  overflow: hidden;
}
</style>
