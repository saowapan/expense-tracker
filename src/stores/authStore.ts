import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

interface LoginResponse {
  token: string
  username: string
  expiresAt: number
}

export const useAuthStore = defineStore('auth', () => {
  // === STATE ===
  const token = ref<string | null>(localStorage.getItem('auth_token'))
  const username = ref<string | null>(localStorage.getItem('auth_username'))
  const loading = ref(false)
  const error = ref<string | null>(null)

  // === GETTERS ===
  const isAuthenticated = computed(() => !!token.value)

  // === ACTIONS ===
  async function login(user: string, password: string) {
    loading.value = true
    error.value = null

    try {
      const response = await api.post<LoginResponse>('/api/auth/login', {
        username: user,
        password
      })

      token.value = response.data.token
      username.value = response.data.username

      // Persist so refresh doesn't log user out
      localStorage.setItem('auth_token', response.data.token)
      localStorage.setItem('auth_username', response.data.username)

      return true
    } catch (err: any) {
      if (err.response?.status === 401) {
        error.value = 'Invalid username or password'
      } else {
        error.value = 'Could not reach server. Please try again.'
      }
      return false
    } finally {
      loading.value = false
    }
  }

  function logout() {
    token.value = null
    username.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_username')
  }

  return {
    // state
    token,
    username,
    loading,
    error,
    // getters
    isAuthenticated,
    // actions
    login,
    logout
  }
})