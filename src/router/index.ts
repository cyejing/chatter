import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PlayingView from '@/views/PlayingView.vue'
import ImmersiveView from '@/views/ImmersiveView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/playing',
      name: 'playing',
      component: PlayingView
    },
    {
      path: '/immersive',
      name: 'immersive',
      component: ImmersiveView
    }
  ]
})

export default router
