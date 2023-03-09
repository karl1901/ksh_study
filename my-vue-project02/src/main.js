import Vue from 'vue';
import App from './App.vue';
import router from './router';

import './filter/myfilter';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import myplugins from './plugins/myplugins';
Vue.use(myplugins);

Vue.config.productionTip = false;

import myTools from './util/myTools';
myTools.errorHandler(Vue);

// import * as l7 from '@antv/l7';
// Vue.prototype.$l7 = l7;
// import * as l7maps from '@antv/l7-maps';
// Vue.prototype.$l7maps = l7maps;

import * as g2 from '@antv/g2';
Vue.prototype.$g2 = g2;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
