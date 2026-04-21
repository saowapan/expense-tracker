<script setup lang="ts">
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import type { ChartData, ChartOptions } from 'chart.js'
import type { Expense } from '@/types/expense'
import { groupByCategory, categoryColors } from '@/utils/expenseAggregations'
import { useFormatters } from '@/composables/useFormatters'


const props = defineProps<{
  expenses: Expense[]
  currency: string
}>()

const { formatAmount } = useFormatters()

const chartData = computed<ChartData<'doughnut'>>(() => {
  const groups = groupByCategory(props.expenses)
  return {
    labels: groups.map(g => g.category),
    datasets: [
      {
        data: groups.map(g => g.total),
        backgroundColor: groups.map(g => categoryColors[g.category] || '#95a5a6'),
        borderWidth: 2,
        borderColor: '#ffffff'
      }
    ]
  }
})

const chartOptions = computed<ChartOptions<'doughnut'>>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        padding: 16,
        font: { size: 12 }
      }
    },
    tooltip: {
      callbacks: {
        label: (ctx) => {
          const value = ctx.parsed as number
          const total = ctx.dataset.data.reduce((sum: number, v) => sum + (v as number), 0)
          const pct = total > 0 ? ((value / total) * 100).toFixed(1) : '0'
          return `${ctx.label}: ${formatAmount(value, props.currency)} (${pct}%)`
        }
      }
    }
  }
}))

const hasData = computed(() => props.expenses.length > 0)

</script>

<template>
  <div class="chart-card">
    <h3>Spending by Category</h3>
    <div v-if="hasData" class="chart-container">
      <Doughnut :data="chartData" :options="chartOptions" />
    </div>
    <p v-else class="empty">No data to chart.</p>
  </div>
</template>

<style scoped>
.chart-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.chart-card h3 {
  margin-bottom: 1rem;
  color: #1a2b3c;
  font-size: 1rem;
}

.chart-container {
  height: 280px;
  position: relative;
}

.empty {
  text-align: center;
  padding: 3rem 1rem;
  color: #888;
}
</style>