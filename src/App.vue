<script setup lang="ts">
import { RouterView } from 'vue-router'
import ErrorAlert from '@/components/ui/notif/ErrorAlert.vue'
</script>

<template>
  <RouterView />
  <ErrorAlert />
</template>

<style scoped>

</style>
