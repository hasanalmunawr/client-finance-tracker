<script setup lang="ts">
import { defineProps, withDefaults, defineEmits, computed } from "vue";

interface Props {
  title: string;
  size?: string; // optional, default via withDefaults
  isOpen: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: "max-w-4xl",
});

const emit = defineEmits<{
  (e: "close"): void;
}>();

const closeModal = () => {
  emit("close");
};

const modalSize = computed(() => ({
  "max-w-sm": props.size === "small",
  "max-w-lg": props.size === "large",
  "max-w-xl": props.size === "extra-large",
  "max-w-4xl": props.size === "max-w-4xl",
  "max-w-5xl": props.size === "max-w-5xl",
  "max-w-7xl": props.size === "max-w-7xl",
}));
</script>


<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center z-50 bg-[hsl(0_0%_0%_/_0.5)] backdrop-blur-sm"
  >
    <div
      :class="[
            'rounded-[var(--radius-lg)] shadow-lg w-full max-h-[90vh] overflow-y-auto p-6 transition-colors duration-300 border',
            'bg-[var(--card)] text-[var(--card-foreground)] border-[var(--border)]',
            modalSize
        ]"
    >
      <!-- Header -->
      <div class="flex justify-between items-center border-b pb-3 border-[var(--border)]">
        <h2 class="text-xl font-semibold">{{ title }}</h2>
        <button
          @click="closeModal"
          class="text-muted-foreground hover:text-destructive text-2xl"
        >
          &times;
        </button>
      </div>

      <!-- Body -->
      <div class="py-4">
        <slot />
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>
