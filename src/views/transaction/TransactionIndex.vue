<script setup lang="ts">
import AppLayout from '@/components/layouts/AppLayout.vue'
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/modal'
import { useModal } from '@/composable/useModal.ts'
import CreateTransaction from '@/components/transaction/CreateTransaction.vue'
import TransactionList from '@/components/transaction/TransactionList.vue'
import { ref } from 'vue'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Transaction',
    href: '/transaction',
  },
];

const {isOpen, hideModal, modalTitle} = useModal();

const transactionListRef = ref()

const newTransaction = () => {
  modalTitle.value = "New Transaction"
  isOpen.value = true
}

const handleSuccess = () => {
  transactionListRef.value?.loadTransactions()
}
</script>
<template>
  <AppLayout :breadcrumbs="breadcrumbs">
    <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
      <div class="flex justify-end px-2">
        <Button @click="newTransaction" >New Transaction</Button>
      </div>
      <div class="relative  rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
        <div class="relative min-h-[100vh] flex-1 rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
          <TransactionList ref="transactionListRef" />
        </div>
      </div>
    </div>
  </AppLayout>
  <Modal :title="modalTitle" :is-open="isOpen" @close="hideModal" size="extra-large">
    <CreateTransaction @success="() => { hideModal(); handleSuccess() }"/>
  </Modal>
</template>

<style scoped>

</style>
