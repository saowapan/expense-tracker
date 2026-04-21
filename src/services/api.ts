import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'

// One shared instance for the whole app
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// --- REQUEST INTERCEPTOR ---
// Before every request goes out, grab the token from Pinia and attach it
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // We use a late import to avoid circular dependency
  // (api ← used by authStore ← imports api)
  const token = localStorage.getItem('auth_token')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// --- RESPONSE INTERCEPTOR ---
// If any API call returns 401, the token is invalid/expired — kick to login
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Clear bad token, send to login
      localStorage.removeItem('auth_token')
      // Avoid redirect loop on the login page itself
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api