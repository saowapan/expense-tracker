<script setup lang="ts">
import type { Period } from '@/types/expense'
import { toISODate } from '@/utils/dateFilters'

const props = defineProps<{
  period: Period
  customFrom: string
  customTo: string
}>()

const emit = defineEmits<{
  'update:period': [period: Period]
  'update:customFrom': [date: string]
  'update:customTo': [date: string]
}>()

const periods: Period[] = ['All', 'Week', 'Month', 'Year', 'Custom']

function selectPeriod(period: Period) {
  if (period === 'Custom' && !props.customFrom) {
    const today = new Date()
    const monthAgo = new Date()
    monthAgo.setDate(today.getDate() - 30)
    emit('update:customFrom', toISODate(monthAgo))
    emit('update:customTo', toISODate(today))
  }
  emit('update:period', period)
}
</script>

<template>
  <div class="filter">
    <div class="button-row">
      <button
        v-for="p in periods"
        :key="p"
        :class="['period-btn', { active: period === p }]"
        @click="selectPeriod(p)"
      >
        {{ p }}
      </button>
    </div>

    <div v-if="period === 'Custom'" class="custom-range">
      <label>
        From:
        <input
          type="date"
          :value="customFrom"
          @input="emit('update:customFrom', ($event.target as HTMLInputElement).value)"
        />
      </label>
      <label>
        To:
        <input
          type="date"
          :value="customTo"
          @input="emit('update:customTo', ($event.target as HTMLInputElement).value)"
        />
      </label>
    </div>
  </div>
</template>

<style scoped>
.filter {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.button-row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.period-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: white;
  color: #555;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 150ms ease;
}

.period-btn:hover {
  border-color: #052E45;
  color: #052E45;
}

.period-btn.active {
  background: #052E45;
  color: white;
  border-color: #052E45;
}

.custom-range {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.custom-range label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #555;
}

.custom-range input {
  padding: 0.4rem 0.6rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.875rem;
}
</style>