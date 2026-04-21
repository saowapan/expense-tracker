import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Chart.js setup — register only what we use
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
} from 'chart.js'

ChartJS.register(
  ArcElement,   // for doughnut/pie
  BarElement,   // for bar chart
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
