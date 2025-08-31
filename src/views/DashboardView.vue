<script setup lang="ts">
import AppLayout from '@/components/layouts/AppLayout.vue'
import { type BreadcrumbItem } from '@/types';
import DashboardMonthlyIncomeExpense from '@/components/dashboard/DashboardMontlyIncomeExpense.vue'
import DashboardExpenseType from '@/components/dashboard/DashboardExpenseType.vue'
import DashboardCard from '@/components/dashboard/DashboardCard.vue'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];


</script>

<template>
  <AppLayout :breadcrumbs="breadcrumbs">
    <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
      <div class="p-2 relative min-h-[100vh] flex-1 rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
        <DashboardCard />
      </div>
      <div class="relative min-h-[100vh] flex-1 rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
        <DashboardMonthlyIncomeExpense />
      </div>
      <div class="relative min-h-[100vh] flex-1 rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
        <DashboardExpenseType />
      </div>
    </div>
  </AppLayout>
</template>

<style scoped>

</style>
