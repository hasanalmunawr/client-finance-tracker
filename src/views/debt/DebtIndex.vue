<script setup lang="ts">
import AppLayout from '@/components/layouts/AppLayout.vue'
import { type BreadcrumbItem } from '@/types';
import { useModal } from '@/composable/useModal.ts'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/modal'
import { CreateDebt } from '@/components/debt'
import { getMine } from '@/services/debt/debt.ts'
import { onMounted } from 'vue'
import type { Debt } from '@/types/models.ts'
import DebtTable from '@/components/debt/DebtTable.vue'
import DebtSummary from '@/components/debt/DebtSummary.vue'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Debt',
    href: '/debt',
  },
];

const debts = defineModel<Debt[]>('debts', { default: [] })

const {isOpen, hideModal, modalTitle} = useModal();

const newDebt = () => {
  modalTitle.value = "New Debt"
  isOpen.value = true
}

const loadDebts = async () => {
  try {
    const response = await getMine()
    debts.value = response.data.result.data
  } catch (error) {
    console.error('Failed to load categories', error)
  }
}
onMounted(loadDebts)
</script>

<template>
  <AppLayout :breadcrumbs="breadcrumbs">
    <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
      <div class="flex justify-end px-2">
        <Button @click="newDebt" >New Debt</Button>
      </div>
      <DebtSummary :debts="debts" />
      <div class="relative  rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
        <div class="relative min-h-[100vh] flex-1 rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
          <DebtTable :debts="debts" @success="loadDebts" />
        </div>
      </div>
    </div>
  </AppLayout>

  <Modal :title="modalTitle" :is-open="isOpen" @close="hideModal" size="extra-large">
    <CreateDebt @success="() => { hideModal(); loadDebts() }"/>
  </Modal>
</template>

<style scoped>

</style>
