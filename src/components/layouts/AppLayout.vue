<script setup lang="ts">
import AppLayout from '@/components/layouts/app/AppSidebarLayout.vue';
import type { BreadcrumbItemType } from '@/types';
// import { reactive } from 'vue';
// import { router, usePage } from '@inertiajs/vue3';
// import Toast from '../components/common/Toast.vue';
// import ErrorToast from '@/components/common/ErrorToast.vue';

interface Props {
  breadcrumbs?: BreadcrumbItemType[];
}

withDefaults(defineProps<Props>(), {
  breadcrumbs: () => [],
});



</script>

<template>
  <AppLayout :breadcrumbs="breadcrumbs">
    <slot />
  </AppLayout>
</template>

<style scoped>

</style>
