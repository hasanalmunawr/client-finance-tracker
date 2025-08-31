<script setup lang="ts">
import BankAccountForm from '@/components/bankAccount/BankAccountForm.vue'
import { create } from '@/services/bank/bankAccount.ts'

const bank = {
  id: -1,
  name: '',
  number: '',
  balance: 0,
}
const emit = defineEmits<{
  (e: 'success'): void
}>()

const handleSubmit = async (payload: { name: string; number: string; balance: number }) => {
  await create(payload)
}

</script>

<template>
  <BankAccountForm :bank="bank" :onSubmit="handleSubmit" @success="emit('success')" />
</template>

<style scoped></style>
