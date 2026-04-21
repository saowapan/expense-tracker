import type { Expense } from '@/types/expense'

/**
 * Groups expenses by category and sums amounts.
 * Returns an array sorted by total descending (biggest first).
 */
export function groupByCategory(expenses: Expense[]): { category: string; total: number }[] {
  const map = new Map<string, number>()

  for (const expense of expenses) {
    const current = map.get(expense.category) || 0
    map.set(expense.category, current + expense.amount)
  }

  return Array.from(map, ([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total)
}

/**
 * Groups expenses by year-month (e.g. "2026-04") and sums amounts.
 * Returns an array sorted chronologically.
 */
export function groupByMonth(expenses: Expense[]): { month: string; total: number }[] {
  const map = new Map<string, number>()

  for (const expense of expenses) {
    // expenseDate is ISO "YYYY-MM-DD" — take first 7 chars for "YYYY-MM" 
    // "2026-04-15".slice(0, 7) → "2026-04"
    const yearMonth = expense.expenseDate.slice(0, 7)
    const current = map.get(yearMonth) || 0
    map.set(yearMonth, current + expense.amount)
  }

  return Array.from(map, ([month, total]) => ({ month, total }))
    .sort((a, b) => a.month.localeCompare(b.month))
}

/**
 * Category → color mapping (kept in sync with ExpenseItem.vue).
 * In a larger app, this would live in a shared constants file.
 */
export const categoryColors: Record<string, string> = {
  Food: '#e74c3c',
  Transport: '#3498db',
  Bills: '#f39c12',
  Entertainment: '#9b59b6',
  Medicine: '#008000',
  Other: '#95a5a6'
}