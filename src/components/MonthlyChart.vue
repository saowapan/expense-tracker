<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import type { ChartData, ChartOptions } from 'chart.js'
import type { Expense } from '@/types/expense'
import { groupByMonth } from '@/utils/expenseAggregations'
import { useFormatters } from '@/composables/useFormatters'


const props = defineProps<{
  expenses: Expense[]
  currency: string
}>()

// Format "2026-04" as "Apr 2026" for display
function formatMonth(yearMonth: string): string {
  const [year = '', month = '01'] = yearMonth.split('-')
  const names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${names[parseInt(month) - 1]} ${year}`
}

const chartData = computed<ChartData<'bar'>>(() => {
  const groups = groupByMonth(props.expenses)
  return {
    labels: groups.map(g => formatMonth(g.month)),
    datasets: [
      {
        label: 'Total Spent',
        data: groups.map(g => g.total),
        backgroundColor: '#0389d7',
        borderRadius: 6,
        borderSkipped: false
      }
    ]
  }
})

const { formatAmount } = useFormatters()

const chartOptions = computed<ChartOptions<'bar'>>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) => formatAmount(ctx.parsed.y as number, props.currency)
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (v) => formatAmount(v as number, props.currency)
      }
    }
  }
}))

const hasData = computed(() => props.expenses.length > 0)

</script>

<template>
  <div class="chart-card">
    <h3>Monthly Trend</h3>
    <div v-if="hasData" class="chart-container">
      <Bar :data="chartData" :options="chartOptions" />
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