import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import ('../views/VideoFile2Gif.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/preview',
    name: 'Preview',
    component: () => import ('../views/ComponentPreview.vue')
  },
  {
    path: '/file2gif',
    name: 'File2gif',
    component: () => import ('../views/VideoFile2Gif.vue')
  },
  {
    path: '/test',
    name: 'testpage',
    component: () => import ('../components/Test.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
