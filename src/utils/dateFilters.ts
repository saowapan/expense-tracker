import type { Period } from '@/types/expense'

export function toISODate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function getDateRangeForPeriod(period: Period): { from: string; to: string } | null {
  if (period === 'All' || period === 'Custom') return null

  const now = new Date()
  const to = toISODate(now)
  let from: Date

  if (period === 'Week') {
    from = new Date(now)
    from.setDate(now.getDate() - 6)
  } else if (period === 'Month') {
    from = new Date(now.getFullYear(), now.getMonth(), 1)
  } else {
    from = new Date(now.getFullYear(), 0, 1)
  }

  return { from: toISODate(from), to }
}

export function isDateInRange(expenseDate: string, from: string, to: string): boolean {
  return expenseDate >= from && expenseDate <= to
}