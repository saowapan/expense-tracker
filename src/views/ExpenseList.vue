<script setup lang="ts">
import type { Expense } from '@/types/expense';
import ExpenseItem from '@/components/ExpenseItem.vue';

defineProps<{
  expenses: Expense[]
}>()

const emit = defineEmits<{
  delete: [id: number]
}>()

</script>

<template>
  <div class="expense-list">
    <p v-if="expenses.length === 0" class="empty-state">
      No expense yet. Add one above!
    </p>
    <ExpenseItem 
      v-for="expense in expenses"
      :key="expense.id"
      :expense="expense"
       @delete="emit('delete', $event)"
    />
  </div>
</template>

<style scoped>
.expense-list {
  display: flex;
  flex-direction: column;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #888;
  background: white;
  border-radius: 8px;
  border: 2px dashed #ddd;
}
</style>