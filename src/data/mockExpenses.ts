import type { Expense } from '@/types/expense'

export const mockExpenses: Expense[] = [
  {
    id: 1,
    amount: 2000.00,
    category: 'Food',
    description: 'Grocery shopping',
    paymentMethod: 'Credit Card',
    currency: 'THB',
    expenseDate: '2026-04-19'
  },
  {
    id: 2,
    amount: 12.00,
    category: 'Transport',
    description: 'Metro ticket',
    paymentMethod: 'Cash',
    currency: 'THB',
    expenseDate: '2026-04-18'
  },
  {
    id: 3,
    amount: 1600.00,
    category: 'Bills',
    description: 'Internet subscription',
    paymentMethod: 'PromptPay',
    currency: 'THB',
    expenseDate: '2026-04-15'
  },
  {
    id: 4,
    amount: 250.00,
    category: 'Entertainment',
    description: 'Movie tickets',
    paymentMethod: 'Credit Card',
    currency: 'THB',
    expenseDate: '2026-04-12'
  },
  {
    id: 5,
    amount: 80.00,
    category: 'Food',
    description: 'Coffee and pastry',
    paymentMethod: 'Cash',
    currency: 'THB',
    expenseDate: '2026-04-10'
  },
  {
    id: 6,
    amount: 7000.00,
    category: 'Bills',
    description: 'Electricity',
    paymentMethod: 'Bank Transfer',
    currency: 'THB',
    expenseDate: '2026-04-05'
  },
  {
    id: 7,
    amount: 2500.00,
    category: 'Food',
    description: 'Dinner out',
    paymentMethod: 'Credit Card',
    currency: 'THB',
    expenseDate: '2026-04-01'
  },
  {
    id: 8,
    amount: 2000.00,
    category: 'Medicine',
    description: 'May Med',
    paymentMethod: 'Cash',
    currency: 'THB',
    expenseDate: '2026-04-01'
  }
]