import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/myfile',
    name: 'MyFile',
    component: () => import('../views/MyFile.vue')
  },
  {
    path: '/three',
    name: 'Three',
    component: () => import('../views/Three.vue')
  },
  {
    path: '/three/three01',
    name: 'Three01',
    component: () => import('../views/three/Three01.vue')
  },
  {
    path: '/three/three02',
    name: 'Three02',
    component: () => import('../views/three/Three02.vue')
  },
  {
    path: '/three/three03',
    name: 'Three03',
    component: () => import('../views/three/Three03.vue')
  },
  {
    path: '/three/three04',
    name: 'Three04',
    component: () => import('../views/three/Three04.vue')
  },
  {
    path: '/three/three05',
    name: 'Three05',
    component: () => import('../views/three/Three05.vue')
  },
  {
    path: '/three/three06',
    name: 'Three06',
    component: () => import('../views/three/Three06.vue')
  }
];

const router = new VueRouter({
  // 去#
  mode: 'history',
  routes
});

export default router;
