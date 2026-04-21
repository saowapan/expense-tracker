import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { getDateRangeForPeriod } from '@/utils/dateFilters'
import { expenseService } from '@/services/expenseService'
import type { Expense, Period } from '@/types/expense'

export const useExpenseStore = defineStore('expense', () => {
  // === STATE ===
  const expenses = ref<Expense[]>([])
  const selectedPeriod = ref<Period>('All')
  const customFrom = ref<string>('')
  const customTo = ref<string>('')
  const loading = ref(false)
  const error = ref<string | null>(null)

  // === GETTERS ===
  const activeRange = computed<{ from: string; to: string } | null>(() => {
    if (selectedPeriod.value === 'Custom') {
      if (!customFrom.value || !customTo.value) return null
      return { from: customFrom.value, to: customTo.value }
    }
    return getDateRangeForPeriod(selectedPeriod.value)
  })

  // Backend returns the already-filtered list — no client-side filtering needed.
  // But we still call this "filteredExpenses" to keep the public API identical.
  const filteredExpenses = computed(() => expenses.value)

  const total = computed(() =>
    filteredExpenses.value.reduce((sum, e) => sum + e.amount, 0)
  )

  const count = computed(() => filteredExpenses.value.length)

  const periodLabel = computed(() => {
    if (selectedPeriod.value === 'All') return 'All Time'
    if (selectedPeriod.value === 'Custom') {
      return activeRange.value
        ? `${activeRange.value.from} → ${activeRange.value.to}`
        : 'Select a range'
    }
    return `This ${selectedPeriod.value}`
  })

  // === ACTIONS ===

  // Fetch expenses from the API, optionally filtered by active range
  async function fetchExpenses() {
    loading.value = true
    error.value = null
    try {
      if (activeRange.value) {
        expenses.value = await expenseService.getByDateRange(
          activeRange.value.from,
          activeRange.value.to
        )
      } else {
        expenses.value = await expenseService.getAll()
      }
    } catch (err: any) {
      error.value = 'Could not load expenses'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function addExpense(newExpense: Omit<Expense, 'id'>) {
    try {
      const created = await expenseService.create(newExpense)
      // Prepend (newest first) — matches backend's sort order
      expenses.value = [created, ...expenses.value]
      // Optionally refetch to stay in sync with server-side ordering
      // await fetchExpenses()
    } catch (err: any) {
      error.value = 'Could not create expense'
      throw err  // re-throw so the form can react
    }
  }

  async function deleteExpense(id: number) {
    try {
      await expenseService.delete(id)
      expenses.value = expenses.value.filter(e => e.id !== id)
    } catch (err: any) {
      error.value = 'Could not delete expense'
      throw err
    }
  }

  function setPeriod(period: Period) {
    selectedPeriod.value = period
  }

  function setCustomFrom(date: string) {
    customFrom.value = date
  }

  function setCustomTo(date: string) {
    customTo.value = date
  }

  // === REACTIVITY MAGIC ===
  // When the filter changes, re-fetch from the server
  watch(activeRange, () => {
    fetchExpenses()
  }, { deep: true })

  return {
    // state
    expenses,
    selectedPeriod,
    customFrom,
    customTo,
    loading,
    error,
    // getters
    activeRange,
    filteredExpenses,
    total,
    count,
    periodLabel,
    // actions
    fetchExpenses,
    addExpense,
    deleteExpense,
    setPeriod,
    setCustomFrom,
    setCustomTo
  }
})