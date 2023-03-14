<template>
  <div>
    <div id="map" style="width: 100%; height: 100vh" />
  </div>
</template>
<script>
// import * as turf from '@turf/turf';
import AMapLoader from '@amap/amap-jsapi-loader';
export default {
  name: 'home',
  data() {
    return {};
  },

  methods: {
    //初始化地图
    initMap() {
      AMapLoader.load({
        key: 'a4340306415b9a97120a2d42ecb9b60b', //申请好的Web端开发者Key，首次调用load时必填
        version: '2.0', //指定要加载的JSAPI的版本，缺省时默认为1.4.15
        plugins: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
        Loca: {
          //是否加载 Loca,缺省不加载
          version: '2.0.0', //Loca 版本,缺省1.3.2
        },
      }).then((AMap) => {
        var map = (window.map = new AMap.Map('map', {
          zoom: 11.7,
          center: [113.97199630737305, 22.5807295363949],
          pitch: 40,
          showLabel: false,
          mapStyle: 'amap://styles/dark',
          viewMode: '3D',
        }));

        var loca = (window.loca = new Loca.Container({
          map,
        }));

        // 蓝色普通点
        var geo = new Loca.GeoJSONSource({
          url: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/sz_road.json',
        });
        var scatter = new Loca.ScatterLayer({
          zIndex: 111,
          opacity: 1,
          visible: true,
          zooms: [2, 22],
        });
        scatter.setSource(geo);
        scatter.setStyle({
          color: 'rgba(43,156,75,1)',
          unit: 'meter',
          size: [150, 150],
          borderWidth: 0,
        });
        loca.add(scatter);

        // 红色呼吸点
        var geoLevelF = new Loca.GeoJSONSource({
          // data: [],
          url: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/sz_road_F.json',
        });
        var breathRed = new Loca.ScatterLayer({
          loca,
          zIndex: 113,
          opacity: 1,
          visible: true,
          zooms: [2, 22],
        });
        breathRed.setSource(geoLevelF);
        breathRed.setStyle({
          unit: 'meter',
          size: [2600, 2600],
          borderWidth: 0,
          texture: 'https://a.amap.com/Loca/static/loca-v2/demos/images/breath_red.png',
          duration: 500,
          animate: true,
        });

        // 黄色呼吸点
        var geoLevelE = new Loca.GeoJSONSource({
          // data: [],
          url: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/sz_road_E.json',
        });
        var breathYellow = new Loca.ScatterLayer({
          loca,
          zIndex: 112,
          opacity: 1,
          visible: true,
          zooms: [2, 22],
        });
        breathYellow.setSource(geoLevelE);
        breathYellow.setStyle({
          unit: 'meter',
          size: [1000, 1000],
          borderWidth: 0,
          texture: 'https://a.amap.com/Loca/static/loca-v2/demos/images/breath_yellow.png',
          duration: 1000,
          animate: true,
        });

        // 启动渲染动画
        loca.animate.start();
      });
    },
  },

  mounted() {
    if (!this.map) {
      this.initMap();
    }
  },
};
</script>
