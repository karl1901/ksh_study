import Vue from 'vue';
import VueRouter from 'vue-router';
import myTools from '../util/myTools';

const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = myTools.sendRoutes();

// console.log('加载路由:', routes);

const router = new VueRouter({
  // url去#
  mode: 'history',
  routes,
});

export default router;
