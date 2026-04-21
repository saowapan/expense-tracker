<script setup lang="ts">
import{ ref, reactive } from 'vue'
import { toISODate } from '@/utils/dateFilters';
import type { Expense, Category, PaymentMethod } from '@/types/expense';


const emit = defineEmits<{
  add: [expense: Omit<Expense, 'id'>]
  cancel: []
}>()

// Form state - using reactive for nested object
const form = reactive({
  amount: '' as string,  // keep as string for input binding, convert on submit
  category: 'Food' as Category,
  description: '',
  paymentMethod: 'Cash' as PaymentMethod,
  currency: 'THB',
  expenseDate: toISODate(new Date())  // default to today
})

// Validation errors — one per field
const errors = ref<Record<string, string>>({})


const categories: Category[] = ['Food', 'Transport', 'Bills', 'Entertainment', 'Medicine', 'Other']
const paymentMethods: PaymentMethod[] = ['Cash', 'Credit Card', 'Bank Transfer', 'PromptPay']

function validate(): boolean {
  errors.value = {}
  const amountNum = parseInt(form.amount)
  if(!form.amount || isNaN(amountNum) || amountNum <= 0) {
    errors.value.amount = 'Amount must be greater than 0'
  }

  if(!form.category) errors.value.category = 'Category is required'
  if(!form.paymentMethod) errors.value.paymentMethod = 'Payment is required'
  if(!form.expenseDate) errors.value.expenseDate = 'Date is required'
  if(form.description.length > 200) {
    errors.value.description = 'Description must be 200 characters or less'
  }

  return Object.keys(errors.value).length === 0;
}

function handleSubmit() {
  if(!validate()) return

  emit('add', {
    amount: parseFloat(form.amount),
    category: form.category,
    description: form.description.trim(),
    paymentMethod: form.paymentMethod,
    currency: form.currency,
    expenseDate: form.expenseDate
  })

  resetForm()
}

function resetForm() {
  form.amount = ''
  form.category = 'Food'
  form.description = ''
  form.paymentMethod = 'Cash'
  form.currency = 'THB'
  form.expenseDate = toISODate(new Date())
  errors.value = {}
}

function handleCancel() {
  resetForm()
  emit('cancel')
}
</script>

<template>
  <form class="add-form" @submit.prevent="handleSubmit">
    <h3>Add New Expense</h3>

    <div class="form-grid">
      <div class="field">
        <label for="amount">Amount *</label>
        <input
          id="amount"
          v-model="form.amount"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          :class="{ 'error-input': errors.amount }"
        />
        <span v-if="errors.amount" class="error-message">{{ errors.amount }}</span>
      </div>

      <div class="field">
        <label for="currency">Currency</label>
        <input
          id="currency"
          v-model="form.currency"
          type="text"
          maxlength="3"
        />
      </div>

      <div class="field">
        <label for="category">Category *</label>
        <select id="category" v-model="form.category">
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>

      <div class="field">
        <label for="paymentMethod">Payment Method *</label>
        <select id="paymentMethod" v-model="form.paymentMethod">
          <option v-for="pm in paymentMethods" :key="pm" :value="pm">{{ pm }}</option>
        </select>
      </div>

      <div class="field">
        <label for="expenseDate">Date *</label>
        <input
          id="expenseDate"
          v-model="form.expenseDate"
          type="date"
          :class="{ 'error-input': errors.expenseDate }"
        />
        <span v-if="errors.expenseDate" class="error-message">{{ errors.expenseDate }}</span>
      </div>

      <div class="field field-full">
        <label for="description">Description</label>
        <input
          id="description"
          v-model="form.description"
          type="text"
          placeholder="Optional note"
          maxlength="200"
          :class="{ 'error-input': errors.description }"
        />
        <span v-if="errors.description" class="error-message">{{ errors.description }}</span>
      </div>
    </div>

    <div class="form-actions">
      <button type="button" class="btn-secondary" @click="handleCancel">Cancel</button>
      <button type="submit" class="btn-primary">Add Expense</button>
    </div>
  </form>
</template>

<style scoped>
.add-form {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.add-form h3 {
  margin-bottom: 1.25rem;
  color: #1a2b3c;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.field {
  display: flex;
  flex-direction: column;
}

.field-full {
  grid-column: 1 / -1;
}

.field label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #555;
  margin-bottom: 0.35rem;
}

.field input,
.field select {
  padding: 0.55rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
  font-family: inherit;
  background: white;
}

.field input:focus,
.field select:focus {
  outline: none;
  border-color: #052E45;
}

.error-input {
  border-color: #e74c3c !important;
}

.error-message {
  color: #e74c3c;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.btn-primary,
.btn-secondary {
  padding: 0.6rem 1.25rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background 150ms ease;
}

.btn-primary {
  background: #052E45;
  color: white;
}

.btn-primary:hover {
  background: #0a4d6e;
}

.btn-secondary {
  background: #f0f2f5;
  color: #555;
}

.btn-secondary:hover {
  background: #e2e8f0;
}
</style>