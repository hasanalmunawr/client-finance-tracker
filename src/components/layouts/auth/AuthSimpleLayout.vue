<script setup lang="ts">
import AppLogoIcon from '@/components/icons/AppLogoIcon.vue';
import { RouterLink } from 'vue-router'

defineProps<{
  title?: string;
  description?: string;
}>();
</script>

<template>
  <div class="flex min-h-svh items-center justify-center bg-background px-4 py-8 md:px-10">
    <div class="w-full max-w-sm">
      <div class="rounded-2xl bg-white shadow-lg dark:shadow-[0_4px_20px_rgba(0,0,0,0.7)] dark:bg-card p-6 md:p-8">
      <div class="flex flex-col gap-6">
          <!-- Logo & Title -->
          <div class="flex flex-col items-center gap-3">
            <RouterLink to="/" class="flex flex-col items-center gap-2">
              <div class="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                <AppLogoIcon class="size-8 fill-current text-foreground dark:text-white" />
              </div>
              <span class="sr-only">{{ title }}</span>
            </RouterLink>
            <div class="text-center space-y-1">
              <h1 class="text-xl font-semibold text-foreground">{{ title }}</h1>
              <p class="text-sm text-muted-foreground">{{ description }}</p>
            </div>
          </div>

          <!-- Form Content -->
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
