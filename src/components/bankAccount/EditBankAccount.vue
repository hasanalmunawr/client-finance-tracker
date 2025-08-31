<script setup lang="ts">
import type { Bank } from '@/types/models.ts'
import { update } from '@/services/bank/bankAccount.ts'
import BankAccountForm from '@/components/bankAccount/BankAccountForm.vue'

const props = defineProps<{
  bank: Bank
}>()

const emit = defineEmits<{
  (e: 'success'): void
}>()

const handleSubmit = async (payload: { name: string; number: string; balance: number; }) => {
  if (props.bank.id) {
    await update(props.bank.id, payload)
  }
}
</script>

<template>
<BankAccountForm :bank="bank" :onSubmit="handleSubmit" @success="emit('success')" />
</template>

<style scoped>

</style>
