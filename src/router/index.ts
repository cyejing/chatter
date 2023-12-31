import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Playing from '@/views/Playing.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/playing',
      name: 'playing',
      component: Playing
    }
  ]
})

export default router
