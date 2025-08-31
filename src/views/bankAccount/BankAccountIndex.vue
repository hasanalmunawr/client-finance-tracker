<script setup lang="ts">
import AppLayout from '@/components/layouts/AppLayout.vue'
import { type BreadcrumbItem } from '@/types';
import { useModal } from '@/composable/useModal.ts';
import { Modal } from '@/components/modal'
import { Button } from '@/components/ui/button'
import { BankTable, CreateBankAccount } from '@/components/bankAccount'
import { getMine } from '@/services/bank/bankAccount.ts'
import { onMounted } from 'vue'
import type { Bank } from '@/types/models.ts'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Bank Account',
    href: '/bank-account',
  },
];
const banks = defineModel<Bank[]>('banks', { default: [] })

const {isOpen, hideModal, modalTitle} = useModal();

const newBank = () => {
  modalTitle.value = "New Bank Account"
  isOpen.value = true
}

const loadBanks = async () => {
  try {
    const response = await getMine()
    banks.value = response.data.result
  } catch (error) {
    console.error('Failed to load categories', error)
  }
}
onMounted(loadBanks)
</script>

<template>
  <AppLayout :breadcrumbs="breadcrumbs">
    <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
      <div class="flex justify-end px-2">
        <Button @click="newBank" >New Bank Account</Button>
      </div>
      <div class="relative  rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
        <div class="relative min-h-[100vh] flex-1 rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
          <BankTable :banks="banks" @success="loadBanks" />
        </div>
      </div>
    </div>

  </AppLayout>

  <Modal :title="modalTitle" :is-open="isOpen" @close="hideModal" size="extra-large">
    <CreateBankAccount @success="() => { hideModal(); loadBanks() }"/>
  </Modal>
</template>

<style scoped>

</style>
