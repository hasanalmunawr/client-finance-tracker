<script setup lang="ts">
import AppLayout from '@/components/layouts/AppLayout.vue'
import SettingsLayout from '@/components/layouts/setting/SettingLayout.vue'
import HeadingSmall from '@/components/setting/HeadingSmall.vue'
import AppearanceTabs from '@/components/setting/AppearanceTabs.vue'
import { type BreadcrumbItem } from '@/types';
const breadcrumbItems: BreadcrumbItem[] = [
  {
    title: 'Appearance settings',
    href: '/settings/appearance',
  },
];
</script>

<template>
  <AppLayout :breadcrumbs="breadcrumbItems">
<!--    <Head title="Appearance settings" />-->

    <SettingsLayout>
      <div class="space-y-6">
        <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
        <AppearanceTabs />
      </div>
    </SettingsLayout>
  </AppLayout>
</template>

<style scoped>

</style>
