<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'

const router = useRouter()
const authStore = useAuthStore()
const { loading, error } = storeToRefs(authStore)
const { login } = authStore

const username = ref('')
const password = ref('')

async function handleLogin() {
  const success = await login(username.value, password.value)
  if (success) {
    router.push('/')
  }
}
</script>

<template>
  <div class="login-page">
    <form class="login-card" @submit.prevent="handleLogin">
      <h2>Sign In</h2>
      <p class="subtitle">Welcome back. Please enter your credentials.</p>

      <div class="field">
        <label for="username">Username</label>
        <input
          id="username"
          v-model="username"
          type="text"
          autocomplete="username"
          autofocus
          :disabled="loading"
        />
      </div>

      <div class="field">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          autocomplete="current-password"
          :disabled="loading"
        />
      </div>

      <p v-if="error" class="error">{{ error }}</p>

      <button type="submit" class="login-btn" :disabled="loading">
        {{ loading ? 'Signing in...' : 'Sign In' }}
      </button>

      <p class="hint">Demo: saowapan / saowapan123</p>
    </form>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.login-card h2 {
  font-size: 1.5rem;
  color: #1a2b3c;
}

.subtitle {
  font-size: 0.875rem;
  color: #666;
  margin-top: -0.5rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.field label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #555;
}

.field input {
  padding: 0.6rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
  font-family: inherit;
}

.field input:focus {
  outline: none;
  border-color: #052E45;
}

.field input:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

.error {
  color: #e74c3c;
  font-size: 0.8rem;
  padding: 0.5rem 0.75rem;
  background: #fde8e6;
  border-radius: 6px;
}

.login-btn {
  background: #052E45;
  color: white;
  border: none;
  padding: 0.7rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.95rem;
}

.login-btn:hover:not(:disabled) {
  background: #0a4d6e;
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.hint {
  font-size: 0.75rem;
  color: #999;
  text-align: center;
}
</style>