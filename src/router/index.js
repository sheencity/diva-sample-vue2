import Vue from 'vue'
import VueRouter from 'vue-router'
import Scene from '../views/Scene.vue'

Vue.use(VueRouter)

const routes = [{
    path: "/",
    name: "Scene",
    component: Scene,
  },
  {
    path: "/scene",
    name: "Scene",
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/Scene.vue"),
  },
  {
    path: "/video",
    name: "Video",
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/Video.vue"),
  },
  {
    path: "/global",
    name: "Global",
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/Global.vue"),
  },
  {
    path: "/weather",
    name: "Weather",
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/Weather.vue"),
  },
  {
    path: "/floor",
    name: "Floor",
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/Floor.vue"),
  },
  {
    path: "/date",
    name: "Date",
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/Date.vue"),
  },
  {
    path: "/state",
    name: "State",
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/State.vue"),
  },
  {
    path: "/monitor",
    name: "Monitor",
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/Monitor.vue"),
  },
  {
    path: "/lamp",
    name: "Lamp",
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/Lamp.vue"),
  },
  {
    path: "/airConditioner",
    name: "AirConditioner",
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/AirConditioner.vue"),
  },
  {
    path: "/customize",
    name: "Customize",
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/Customize.vue"),
  },
  {
    path: "/overlay",
    name: "Overlay",
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/Overlay.vue"),
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router