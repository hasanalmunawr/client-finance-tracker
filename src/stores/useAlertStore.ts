// stores/useAlertStore.ts
import { defineStore } from 'pinia'

export const useAlertStore = defineStore('alert', {
  state: () => ({
    message: '',
    type: 'info', // success, error, warning, info
    visible: false,
  }),
  actions: {
    show(message: string, type = 'info') {
      this.message = message
      this.type = type
      this.visible = true

      setTimeout(() => {
        this.visible = false
      }, 10000)
    },
    hide() {
      this.visible = false
    }
  }
})
