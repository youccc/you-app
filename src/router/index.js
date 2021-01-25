import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/draggable',
    name: 'draggable',
    component: () => import('../views/draggable.vue')
  },
  {
    path: '/text',
    name: 'text',
    component: () => import('../views/text.vue')
  },
  {
    path: '/text1',
    name: 'text1',
    component: () => import('../views/text1.vue')
  },
]

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
