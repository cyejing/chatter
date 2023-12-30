import { createRouter, createWebHistory } from 'vue-router'
import HomeInput from '@/views/HomeInputView.vue'
import Playing from '@/views/Playing.vue'

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
      component: Playing
    }
  ]
})

export default router
