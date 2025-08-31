<script setup lang="ts">
import BudgetForm from '@/components/budget/BudgetForm.vue'
import { create } from '@/services/budget/budget.ts'
import type { BudgetHeader } from '@/types/models.ts'

defineProps<{
  budgetHeader: BudgetHeader
}>()

const budget = {
  id: -1,
  budget_header_id: -1,
  category_id: -1,
  description: '',
  amount: 0,
}

const emit = defineEmits<{
  (e: 'success'): void
}>()

const handleSubmit = async (payload: { budget_header_id: number; category_id: number; description: string; amount: number }) => {
  await create(payload)
}
</script>

<template>
  <BudgetForm :budgetHeader="budgetHeader" :budget="budget" :onSubmit="handleSubmit" @success="emit('success')" />
</template>

<style scoped></style>
