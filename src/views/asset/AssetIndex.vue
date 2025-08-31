<script setup lang="ts">
import AppLayout from '@/components/layouts/AppLayout.vue'
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/modal'
import { useModal } from '@/composable/useModal.ts'
// import type { Payment } from "@/types/models"
// import { columns } from '@/views/asset/columns.ts'
// import DataTable from '@/components/payments/DataTable.vue'
// import CreateTransaction from '@/components/transaction/CreateTransaction.vue'
// import TransactionList from '@/components/transaction/TransactionList.vue'
// import { ref , onMounted } from 'vue'
import PaymentTable from '@/components/payments/PaymentTable.vue'
const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Asset',
    href: '/transaction',
  },
];

const {isOpen, hideModal, modalTitle} = useModal();

// const transactionListRef = ref()

const newTransaction = () => {
  modalTitle.value = "New Transaction"
  isOpen.value = true
}

// const handleSuccess = () => {
//   transactionListRef.value?.loadTransactions()
// }
// const data = ref<Payment[]>([])
//
// async function getData(): Promise<Payment[]> {
//   return [
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'm@example.com',
//     },
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'm@example.com',
//     },
//     {
//       id: '728ed52f',
//       amount: 11200,
//       status: 'pending',
//       email: 'm@example.com',
//     },
//     {
//       id: '728ed52f',
//       amount: 10230,
//       status: 'pending',
//       email: 'm@example.com',
//     },
//     {
//       id: '728ed52f',
//       amount: 10012,
//       status: 'pending',
//       email: 'm@example.com',
//     },
//     {
//       id: '728ed52f',
//       amount: 23100,
//       status: 'pending',
//       email: 'm@example.com',
//     },
//
//   ]
// }
//
// onMounted(async () => {
//   data.value = await getData()
// })
</script>
<template>
  <AppLayout :breadcrumbs="breadcrumbs">
    <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
      <div class="flex justify-end px-2">
        <Button @click="newTransaction" >New Transaction</Button>
      </div>
      <div class="container py-10 mx-auto">
<!--        <DataTable :columns="columns" :data="data" />-->
        <PaymentTable/>
      </div>
    </div>
  </AppLayout>
  <Modal :title="modalTitle" :is-open="isOpen" @close="hideModal" size="extra-large">
  </Modal>
</template>

<style scoped>

</style>
