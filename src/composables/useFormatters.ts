/**
 * Reusable formatting helpers — powered by the browser's built-in Intl API.
 * No date libraries needed, no extra bundle weight.
 */
export function useFormatters(locale = 'en-US') {

  /**
   * Formats amounts with thousands separators and 2 decimal places.
   * formatAmount(1234.5, 'THB')  →  "THB 1,234.50"
   */
  function formatAmount(amount: number, currency: string): string {
    const formatted = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
    return `${currency} ${formatted}`
  }

  /**
   * Formats ISO date "2026-04-19" as "Apr 19, 2026".
   * Timezone-safe — parses as local date, not UTC.
   */
  function formatDate(isoDate: string): string {
    // Parse "2026-04-19" manually to avoid timezone shift
    const [year = 1970, month = 1, day = 1] = isoDate.split('-').map(Number)
    const d = new Date(year, month - 1, day)
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(d)
  }

  return {
    formatAmount,
    formatDate
  }
}