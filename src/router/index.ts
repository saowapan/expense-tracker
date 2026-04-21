import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { hideWhenAuthed: true }
    }
  ]
})

// Route guard — runs before every navigation
router.beforeEach((to) => {
  const authStore = useAuthStore()

  // Protected route, not logged in → redirect to login
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login' }
  }

  // Already logged in, trying to visit login → redirect to dashboard
  if (to.meta.hideWhenAuthed && authStore.isAuthenticated) {
    return { name: 'home' }
  }
})

export default router