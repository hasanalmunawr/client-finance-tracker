// stores/sidebar.ts
import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    open: JSON.parse(localStorage.getItem('sidebar_open') ?? 'true'),
    openMobile: false,
  }),
  actions: {
    toggleSidebar() {
      this.open = !this.open
      localStorage.setItem('sidebar_open', JSON.stringify(this.open))
    },
    setOpen(val: boolean) {
      this.open = val
      localStorage.setItem('sidebar_open', JSON.stringify(val))
    },
  },
})
