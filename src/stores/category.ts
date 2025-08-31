import { defineStore } from 'pinia'
import type { Category } from '@/types/models.ts'
import { getMine } from '@/services/category/category.ts'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [] as Category[],
    isLoaded: false
  }),
  actions: {
    async fetchCategories() {
      if (!this.isLoaded) {
        const response = await getMine()
        this.categories = response.data.result
        this.isLoaded = true
      }
    }
  }
})
