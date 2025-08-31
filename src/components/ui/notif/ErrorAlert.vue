<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAlertStore } from '@/stores/useAlertStore'

interface Props {
  size?: string; // optional, default via withDefaults
}
const props = withDefaults(defineProps<Props>(), {
  size: 'small'
})

const alert = useAlertStore()
const { message, type, visible } = storeToRefs(alert)

import { computed } from 'vue'

const modalSize = computed(() => ({
  "max-w-sm": props.size === "small",
  "max-w-lg": props.size === "large",
  "max-w-xl": props.size === "extra-large",
  "max-w-4xl": props.size === "max-w-4xl",
  "max-w-5xl": props.size === "max-w-5xl",
  "max-w-7xl": props.size === "max-w-7xl",
}));

const closeModal = () => {
  visible.value = false;
};
</script>

<template>
  <div
    v-if="visible"
    class="fixed inset-0 flex items-center justify-center z-50 bg-[hsl(0_0%_0%_/_0.5)] backdrop-blur-sm"
  >
    <div
      :class="[
        'rounded-[var(--radius-lg)] shadow-lg w-full max-h-[90vh] overflow-y-auto p-6 transition-colors duration-300 border',
        'bg-[var(--card)] text-[var(--card-foreground)] border-[var(--border)]',
        modalSize,
        {
          'bg-green-500': type === 'success',
          'bg-red-500': type === 'error',
          'bg-yellow-500': type === 'warning',
          'bg-blue-500': type === 'info',
        }
      ]">
      <!-- Header -->
      <div class="flex justify-between items-center border-b pb-3 border-[var(--border)]">
        <h2 class="text-xl font-semibold">Error</h2>
        <button
          @click="closeModal"
          class="text-muted-foreground hover:text-destructive text-2xl"
        >
          &times;
        </button>
      </div>

      <!-- Body -->
      <div class="py-4">
       {{ message }}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
