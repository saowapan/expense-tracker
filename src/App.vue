<script setup lang="ts">
import { RouterView, RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'

const router = useRouter()
const authStore = useAuthStore()
const { isAuthenticated, username } = storeToRefs(authStore)

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="app">
    <nav class="nav">
      <div class="nav-inner">
        <RouterLink to="/" class="brand">
          💰 Expense Tracker
        </RouterLink>
        <div class="nav-links">
          <template v-if="isAuthenticated">
            <RouterLink to="/" class="nav-link">Dashboard</RouterLink>
            <span class="user">👤 {{ username }}</span>
            <button class="logout-btn" @click="handleLogout">Sign Out</button>
          </template>
          <template v-else>
            <RouterLink to="/login" class="nav-link">Sign In</RouterLink>
          </template>
        </div>
      </div>
    </nav>
    <main>
      <div class="container">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.nav {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.nav-inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  font-size: 1.1rem;
  font-weight: 700;
  color: #052E45;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-link {
  color: #666;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.35rem 0;
  border-bottom: 2px solid transparent;
  transition: all 150ms ease;
}

.nav-link:hover {
  color: #052E45;
}

.nav-link.router-link-active {
  color: #052E45;
  border-bottom-color: #052E45;
}

.user {
  font-size: 0.85rem;
  color: #555;
}

.logout-btn {
  background: transparent;
  border: 1px solid #ddd;
  color: #555;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 150ms ease;
}

.logout-btn:hover {
  border-color: #e74c3c;
  color: #e74c3c;
}

main {
  flex: 1;
}

.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

@media (max-width: 720px) {
  .container {
    padding: 1.5rem 1rem;
  }
}
</style>