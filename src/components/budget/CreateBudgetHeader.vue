<script setup lang="ts">
import BudgetHeaderForm from '@/components/budget/BudgetHeaderForm.vue'
import { createBudgetHeader } from '@/services/budget/budgetHeader.ts'


const budgetHeader = {
  id: 0,
  name: '',
  period: '',
  notes: '',
}

const emit = defineEmits<{
  (e: 'success'): void
}>()

const handleSubmit = async (payload: { name: string; period: string; notes: string }) => {
  await createBudgetHeader(payload)
}
</script>

<template>
<BudgetHeaderForm
  :budgetHeader="budgetHeader" :onSubmit="handleSubmit" @success="emit('success')"
/>
</template>

<style scoped>

</style>
