<script setup lang="ts">
import { SidebarProvider } from '@/components/ui/sidebar';
import { computed } from 'vue'
import { useSidebarStore } from '@/stores/sidebar.ts'

interface Props {
  variant?: 'header' | 'sidebar';
}

defineProps<Props>();

const sidebar = useSidebarStore()
const isOpen = computed(() => sidebar.open)
</script>

<template>
  <div v-if="variant === 'header'" class="flex min-h-screen w-full flex-col">
    <slot />
  </div>
  <SidebarProvider v-else :default-open="isOpen">
    <slot />
  </SidebarProvider>
</template>

<style scoped>

</style>
