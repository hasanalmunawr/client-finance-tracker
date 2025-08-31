import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Auth } from '@/types'
export const useAppStore = defineStore('app', () => {
  const name = ref('My App')
  const quote = ref({ message: '', author: '' })
  const auth = ref<Auth | null>(null)
  const sidebarOpen = ref(false)

  return { name, quote, auth, sidebarOpen }
})
