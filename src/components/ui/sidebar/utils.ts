// /sidebar/utils.ts
import { computed, ref, watch } from 'vue'
import { createContext } from 'reka-ui'


export const SIDEBAR_COOKIE_NAME = 'sidebar_state'
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
export const SIDEBAR_WIDTH = '16rem'
export const SIDEBAR_WIDTH_MOBILE = '18rem'
export const SIDEBAR_WIDTH_ICON = '3rem'
export const SIDEBAR_KEYBOARD_SHORTCUT = 'b'

// State dideklarasikan di luar agar tidak reset
const open = ref(JSON.parse(localStorage.getItem('sidebar_open') ?? 'true'))
const openMobile = ref(false)
const isMobile = ref(false)

watch(open, (val) => {
  localStorage.setItem('sidebar_open', JSON.stringify(val))
})

const state = computed(() => (open.value ? 'expanded' : 'collapsed'))

function setOpen(value: boolean) {
  open.value = value
}

function setOpenMobile(value: boolean) {
  openMobile.value = value
}

function toggleSidebar() {
  open.value = !open.value
}

// ✅ createContext pakai string (nama context)
export const [useSidebar, provideSidebarContext] = createContext<{
  state: typeof state
  open: typeof open
  setOpen: typeof setOpen
  isMobile: typeof isMobile
  openMobile: typeof openMobile
  setOpenMobile: typeof setOpenMobile
  toggleSidebar: typeof toggleSidebar
}>('Sidebar')



// import type { ComputedRef, Ref } from 'vue'
// import { createContext } from 'reka-ui'
//
// export const SIDEBAR_COOKIE_NAME = 'sidebar_state'
// export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
// export const SIDEBAR_WIDTH = '16rem'
// export const SIDEBAR_WIDTH_MOBILE = '18rem'
// export const SIDEBAR_WIDTH_ICON = '3rem'
// export const SIDEBAR_KEYBOARD_SHORTCUT = 'b'
//
// export const [useSidebar, provideSidebarContext] = createContext<{
//   state: ComputedRef<'expanded' | 'collapsed'>
//   open: Ref<boolean>
//   setOpen: (value: boolean) => void
//   isMobile: Ref<boolean>
//   openMobile: Ref<boolean>
//   setOpenMobile: (value: boolean) => void
//   toggleSidebar: () => void
// }>('Sidebar')
