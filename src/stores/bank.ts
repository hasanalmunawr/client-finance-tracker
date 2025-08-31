import { defineStore } from 'pinia'
import type { Bank } from '@/types/models.ts'
import { getMine } from '@/services/bank/bankAccount.ts'

export const useBankStore = defineStore('bank', {
  state: () => ({
    banks: [] as Bank[],
    isLoaded: false
  }),
  actions: {
    async fetchBanks() {
      if (!this.isLoaded) {
        const response = await getMine()
        this.banks = response.data.result
        this.isLoaded = true
      }
    }
  }
})
