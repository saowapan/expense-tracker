export interface Expense {
  id: number
  amount: number
  category: string
  description: string
  paymentMethod: string
  currency: string
  expenseDate: string // ISO format: "2026-04-20"
}

export type Category = 'Food' | 'Transport' | 'Bills' | 'Entertainment' | 'Medicine' | 'Other'
export type PaymentMethod = 'Cash' | 'Credit Card' | 'Bank Transfer' | 'PromptPay' 
export type Period = 'All' | 'Week' | 'Month' | 'Year' | 'Custom'