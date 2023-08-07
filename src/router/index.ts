import { createRouter, createWebHistory } from 'vue-router'
import HomeInput from '@/views/HomeInputView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeInput
    },
    {
      path: '/virtuoso',
      name: 'virtuoso',
      component: () => import('../views/VirtuosoDemoView.vue')
    },
    {
      path: '/playing',
      name: 'playing',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Playing.vue')
    }
  ]
})

export default router
