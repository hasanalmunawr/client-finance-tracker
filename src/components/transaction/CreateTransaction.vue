<script setup lang="ts">
import TransactionForm from '@/components/transaction/TransactionForm.vue'
import { create } from '@/services/transaction/transaction.ts'

const transaction = {
  id: 0,
  type: '',
  category_id: 0,
  from_bank_account_id: 0,
  to_bank_account_id: 0,
  amount: 0,
  notes: '',
  date: '',
}

const emit = defineEmits<{
  (e: 'success'): void
}>()

const handleSubmit = async (payload: {
  type: string;
  category_id: number;
  from_bank_account_id: number;
  to_bank_account_id: number;
  amount: number;
  notes: string;
  date: string;
}) => {
  await create(payload)
}
</script>

<template>
<TransactionForm :transaction="transaction" :onSubmit="handleSubmit" @success="emit('success')" />
</template>

<style scoped>

</style>
