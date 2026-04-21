# expense-tracker

A Vue 3 expense tracker: log expenses, filter by period, and visualize spending by category and month.

## Stack

- **Vue 3** + **TypeScript** + **Vite**
- **Pinia** for state (auth, expenses)
- **Vue Router** with auth guards
- **axios** with request/response interceptors (JWT via `localStorage`, auto-redirect on 401)
- **Chart.js** + **vue-chartjs** for category and monthly charts

## Requirements

- Node `^20.19.0` or `>=22.12.0`
- A running backend exposing the expense + auth API

## Setup

```sh
npm install
cp .env.example .env   # then edit VITE_API_BASE_URL if needed
```

`.env`:

```
VITE_API_BASE_URL=http://localhost:8080
```

## Scripts

```sh
npm run dev          # start Vite dev server with HMR
npm run build        # type-check + production build
npm run preview      # preview the production build
npm run type-check   # vue-tsc only
```

## Project layout

```
src/
├─ components/   AddExpenseForm, ExpenseItem, PeriodFilter, CategoryChart, MonthlyChart
├─ views/        HomeView, ExpenseList, LoginView
├─ stores/       authStore, expenseStore (Pinia)
├─ services/     api.ts (axios instance + interceptors), expenseService
├─ composables/  useFormatters
├─ router/       routes + beforeEach auth guard
├─ types/        expense types
└─ utils/
```

Routes: `/` (requires auth) and `/login`. Unauthenticated visits to `/` redirect to `/login`; authenticated visits to `/login` redirect home.

## Recommended editor setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar). Disable Vetur if installed. `vue-tsc` handles `.vue` type checking at build time.
