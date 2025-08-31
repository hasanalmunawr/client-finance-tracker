<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface Props {
  route: string;
  tabindex?: number;
}

const props = defineProps<Props>();
</script>

<template>
  <RouterLink
    :to="props.route"
    :tabindex="props.tabindex"
    class="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
  >
    <slot />
  </RouterLink>
</template>
