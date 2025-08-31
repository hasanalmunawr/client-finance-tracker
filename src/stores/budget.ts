/*
import { defineStore } from 'pinia'
import * as budgetService from '../services//services/budget'

export const useBudgetStore = defineStore('budget', {
  state: () => ({
    budgets: [] as Budget[],
    loading: false
  }),
  actions: {
    async fetchBudgets() {
      this.loading = true
      const res = await budgetService.getMine()
      this.budgets = res.data
      this.loading = false
    },
    async createBudget(payload: { name: string; type: string }) {
      const res = await budgetService.create(payload)
      this.budgets.push(res.data) // langsung update state
    }
  }
})
*/
