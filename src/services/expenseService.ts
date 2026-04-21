import api from './api'
import type { Expense } from '@/types/expense'

// Shape of the backend response — mirrors ExpenseResponse DTO
interface ExpenseResponse {
  id: number
  amount: number
  category: string
  description: string
  paymentMethod: string
  currency: string
  expenseDate: string
  createdAt: string
}

// Shape of the backend request — mirrors ExpenseRequest DTO
interface ExpenseRequest {
  amount: number
  category: string
  description: string
  paymentMethod: string
  currency: string
  expenseDate: string
}

export const expenseService = {
  async getAll(): Promise<Expense[]> {
    const { data } = await api.get<ExpenseResponse[]>('/api/expenses')
    return data.map(toExpense)
  },

  async getByDateRange(from: string, to: string): Promise<Expense[]> {
    const { data } = await api.get<ExpenseResponse[]>('/api/expenses', {
      params: { from, to }
    })
    return data.map(toExpense)
  },

  async create(payload: Omit<Expense, 'id'>): Promise<Expense> {
    const request: ExpenseRequest = {
      amount: payload.amount,
      category: payload.category,
      description: payload.description,
      paymentMethod: payload.paymentMethod,
      currency: payload.currency,
      expenseDate: payload.expenseDate
    }
    const { data } = await api.post<ExpenseResponse>('/api/expenses', request)
    return toExpense(data)
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/api/expenses/${id}`)
  }
}

// Map backend DTO → frontend model
// Strips `createdAt` since the frontend doesn't use it
function toExpense(r: ExpenseResponse): Expense {
  return {
    id: r.id,
    amount: r.amount,
    category: r.category,
    description: r.description ?? '',
    paymentMethod: r.paymentMethod,
    currency: r.currency,
    expenseDate: r.expenseDate
  }
}