import Vue from 'vue';
import VueRouter from 'vue-router';
import myTools from '../util/myTools';

const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = myTools.sendRoutes();

routes.forEach((r) => {
  console.log('name:', r.name);
  console.log('path:', r.path);
  console.log('component:', r.component.__file);
  console.log('-------------------');
});

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
