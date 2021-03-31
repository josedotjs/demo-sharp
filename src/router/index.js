import Vue from 'vue'
import VueRouter from 'vue-router'
import Formats from '../views/Formats.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/formats',
    name: 'Formats',
    component: Formats,
  },
  {
    path: '/resize',
    name: 'Resize',
    component: () =>
      import(/* webpackChunkName: "resize" */ '../views/Resize.vue'),
  },
  {
    path: '/gifwebp',
    name: 'GifWebp',
    component: () =>
      import(/* webpackChunkName: "gifwebp" */ '../views/GifWebp.vue'),
  },
  {
    path: '/operations',
    name: 'Operations',
    component: () =>
      import(/* webpackChunkName: "operations" */ '../views/Operations.vue'),
  },
  {
    path: '/composition',
    name: 'Composition',
    component: () =>
      import(/* webpackChunkName: "composition" */ '../views/Composition.vue'),
  },
  {
    path: '/colors',
    name: 'Colors',
    component: () =>
      import(/* webpackChunkName: "colors" */ '../views/Colors.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
