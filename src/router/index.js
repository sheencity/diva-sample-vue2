import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    redirect: '/scene',
  },
  {
    path: '/scene',
    name: 'Scene',
    component: () =>
      import( /* webpackChunkName: 'about' */ '../views/Scene.vue'),
  },
  {
    path: '/video',
    name: 'Video',
    component: () =>
      import( /* webpackChunkName: 'video' */ '../views/Video.vue'),
  },
  {
    path: '/global',
    name: 'Global',
    component: () =>
      import( /* webpackChunkName: 'global' */ '../views/Global.vue'),
  },
  {
    path: '/weather',
    name: 'Weather',
    component: () =>
      import( /* webpackChunkName: 'weather' */ '../views/Weather.vue'),
  },
  {
    path: '/floor',
    name: 'Floor',
    component: () =>
      import( /* webpackChunkName: 'floor' */ '../views/Floor.vue'),
  },
  {
    path: '/date',
    name: 'Date',
    component: () =>
      import( /* webpackChunkName: 'date' */ '../views/Date.vue'),
  },
  {
    path: '/state',
    name: 'State',
    component: () =>
      import( /* webpackChunkName: 'state' */ '../views/State.vue'),
  },
  {
    path: '/monitor',
    name: 'Monitor',
    component: () =>
      import( /* webpackChunkName: 'monitor' */ '../views/Monitor.vue'),
  },
  {
    path: '/lamp',
    name: 'Lamp',
    component: () =>
      import( /* webpackChunkName: 'lamp' */ '../views/Lamp.vue'),
  },
  {
    path: '/airConditioner',
    name: 'AirConditioner',
    component: () =>
      import( /* webpackChunkName: 'airConditioner' */ '../views/AirConditioner.vue'),
  },
  {
    path: '/customize',
    name: 'Customize',
    component: () =>
      import( /* webpackChunkName: 'customize' */ '../views/Customize.vue'),
  },
  {
    path: '/overlay',
    name: 'Overlay',
    component: () =>
      import( /* webpackChunkName: 'overlay' */ '../views/Overlay.vue'),
  },
  {
    path: '*',
    redirect: '/scene',
  }
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;