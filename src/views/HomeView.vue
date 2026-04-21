<script setup lang="ts">
import {ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useExpenseStore } from '@/stores/expenseStore';
import ExpenseList from './ExpenseList.vue';
import PeriodFilter from '@/components/PeriodFilter.vue';
import AddExpenseForm from '@/components/AddExpenseForm.vue'
import type { Period } from '@/types/expense';
import CategoryChart from '@/components/CategoryChart.vue'
import MonthlyChart from '@/components/MonthlyChart.vue'
import { useFormatters } from '@/composables/useFormatters'
import { onMounted } from 'vue'


// Local UI state — doesn't belong in the store
const showAddForm = ref(false)

// === STORE ===
const store = useExpenseStore()

// Destructure reactive state with storeToRefs — keeps reactivity
const { selectedPeriod, customFrom, customTo, filteredExpenses, total, count, periodLabel } = storeToRefs(store)

// Actions can be destructured directly (they're plain functions, not reactive)
const { addExpense, deleteExpense, setPeriod, setCustomFrom, setCustomTo } = store

const { formatAmount } = useFormatters()

onMounted(() => {
  store.fetchExpenses()
})
</script>

<template>
  <div class="home">
    <div class="top-bar">
       <PeriodFilter
        :period="selectedPeriod"
        :custom-from="customFrom"
        :custom-to="customTo"
        @update:period="setPeriod"
        @update:custom-from="setCustomFrom"
        @update:custom-to="setCustomTo"
      />
      <button
        v-if="!showAddForm"
        class="add-btn"
        @click="showAddForm = true"
      >
        + Add Expense
      </button>
    </div>

    <AddExpenseForm
      v-if="showAddForm"
      @add="(payload) => { addExpense(payload); showAddForm = false }"
      @cancel="showAddForm = false"
    />

    <section class="summary">
      <div class="summary-card">
        <p class="summary-label">Total Spent</p>
        <p class="summary-value">{{ formatAmount(total, 'THB') }}</p>
        <p class="summary-sublabel">{{ periodLabel }}</p>
      </div>
      <div class="summary-card">
        <p class="summary-label">Transactions</p>
        <p class="summary-value">{{ count }}</p>
        <p class="summary-sublabel">{{ periodLabel }}</p>
      </div>
    </section>

    <section class="charts">
      <CategoryChart :expenses="filteredExpenses" currency="THB" />
      <MonthlyChart :expenses="filteredExpenses" currency="THB" />
    </section>

    <section class="list-section">
      <h2>Expenses</h2>
      <ExpenseList :expenses="filteredExpenses" @delete="deleteExpense" />

    </section>
  </div>
</template>


<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.top-bar {
  display: flex;
  gap: 1rem;
  align-items: stretch;
}

.top-bar > :first-child {
  flex: 1;
}

.add-btn {
  padding: 0 1.5rem;
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: background 150ms ease;
}

.add-btn:hover {
  background: #219a52;
}

.summary {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.summary-card {
  background: linear-gradient(135deg, #0389d7 0%, #4abaf2 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.summary-label {
  font-size: 0.875rem;
  opacity: 0.8;
  margin-bottom: 0.5rem;
}

.summary-value {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.summary-sublabel {
  font-size: 0.75rem;
  opacity: 0.7;
}

.list-section h2 {
  margin-bottom: 1rem;
  color: #1a2b3c;
}
.charts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 720px) {
  .charts {
    grid-template-columns: 1fr;
  }
}
</style>