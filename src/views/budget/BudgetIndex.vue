<script setup lang="ts">
import AppLayout from '@/components/layouts/AppLayout.vue'
import { type BreadcrumbItem } from '@/types';
import { useModal } from '@/composable/useModal.ts'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/modal'
import type { BudgetHeader } from '@/types/models.ts'
import { getMineBudgetHeader } from '@/services/budget/budgetHeader.ts'
import { onMounted } from 'vue'
import CreateBudgetHeader from '@/components/budget/CreateBudgetHeader.vue'
import BudgetHeaderTable from '@/components/budget/BudgetHeaderTable.vue'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Budget',
    href: '/budget',
  },
];

const budgets = defineModel<BudgetHeader[]>('budgets', { default: [] })

const {isOpen, hideModal, modalTitle} = useModal();

const newBudget = () => {
  modalTitle.value = "Buat Grup Anggaran"
  isOpen.value = true
}

const loadBudgetHeaders = async () => {
  try {
    const response = await getMineBudgetHeader()
    // console.log(response.data.result)
    budgets.value = response.data.result
    console.log(budgets.value)
  } catch (error) {
    console.error('Failed to load categories', error)
  }
}
onMounted(loadBudgetHeaders)
</script>

<template>
  <AppLayout :breadcrumbs="breadcrumbs">
    <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
      <div class="flex justify-end px-2">
        <Button @click="newBudget" >Buat Grup Anggaran</Button>
      </div>
      <div class="relative  rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
        <div class="relative min-h-[100vh] flex-1 rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
          <BudgetHeaderTable :budgetHeaders="budgets"  @success="loadBudgetHeaders" />
        </div>
      </div>
    </div>
  </AppLayout>

  <Modal :title="modalTitle" :is-open="isOpen" @close="hideModal" size="extra-large">
    <CreateBudgetHeader @success="() => { hideModal(); loadBudgetHeaders() }" />
  </Modal>
</template>

<style scoped>

</style>
