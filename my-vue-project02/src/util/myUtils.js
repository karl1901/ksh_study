import AmapLoader from '@amap/amap-jsapi-loader';

let myUtils = {};

const loadAmapKey = 'a4340306415b9a97120a2d42ecb9b60b';

myUtils.loadAmap = (cb) => {
  AmapLoader.load({
    key: loadAmapKey,
    version: '2.0',
    plugins: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
    Loca: {
      version: '2.0.0',
    },
  })
    .then((AMap) => {
      cb({ AMap, Loca });
    })
    .catch((e) => {
      console.log('高德地图Loca数据可视化API加载发生错误:', e);
      cb(null);
    });
};

export default myUtils;
