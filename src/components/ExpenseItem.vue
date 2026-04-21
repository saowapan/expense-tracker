<script setup lang="ts">
import type { Expense } from '@/types/expense';
import { useFormatters } from '@/composables/useFormatters'


const props = defineProps<{
  expense: Expense
}>()

const emit = defineEmits<{
  delete: [id:number]
}>()

const { formatAmount, formatDate } = useFormatters()

// Category-to-color mapping for the left border accent 
const categoryColors: Record<string, string> = {
  Food: '#e74c3c',
  Transport: '#3498db',
  Bills: '#f39c12',
  Entertainment: '#9b59b6',
  Medicine: '#008000',
  Other: '#95a5a6'
}

function handleDelete(id: number) {
  if(confirm('Delete this expense?')) {
    emit('delete', id);
  }
}
</script>

<template>
  <article 
    class="expense-item" 
    :style="{ borderLeftColor: categoryColors[expense.category] || '#95a5a6' }"
  >
  <div class="expense-main">
    <div class="expense-header">
      <span class="category">{{ expense.category }}</span>
      <span class="date">{{ formatDate(expense.expenseDate) }}</span>
    </div>

    <p class="description">{{ expense.description || 'No Description'}}</p>
    <p class="payment">via {{ expense.paymentMethod }}</p>
  </div>

   <div class="expense-right">
      <div class="expense-amount">
        {{ formatAmount(expense.amount, expense.currency) }}
      </div>
      <button class="delete-btn" @click="handleDelete(expense.id)">
        Delete
      </button>
    </div>
  </article>
</template>

<style scoped>
.expense-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 1rem 1.25rem;
  border-radius: 8px;
  border-left: 4px solid #95a5a6;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  margin-bottom: 0.75rem;
}

.expense-main {
  flex: 1;
}

.expense-header {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin-bottom: 0.25rem;
}

.category {
  font-weight: 600;
  font-size: 0.875rem;
  color: #333;
}

.date {
  font-size: 0.8rem;
  color: #888;
}

.description {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 0.25rem;
}

.payment {
  font-size: 0.75rem;
  color: #999;
}

.expense-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: 1rem;
}

.expense-amount {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a2b3c;
}

.delete-btn {
  background: transparent;
  border: 1px solid transparent;
  color: #aaa;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  transition: all 150ms ease;
}

.delete-btn:hover {
  color: #e74c3c;
  background: #fde8e6;
  border-color: #fabcb5;
}

</style>