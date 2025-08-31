<script setup lang="ts">
import BudgetForm from '@/components/budget/BudgetForm.vue'
import { update } from '@/services/budget/budget.ts'
import type { Budget, BudgetHeader } from '@/types/models.ts'

const props = defineProps<{
  budget: Budget
  budgetHeader: BudgetHeader
}>()

const emit = defineEmits<{
  (e: 'success'): void
}>()

const handleSubmit = async (payload: {budget_header_id: number; category_id: number; description: string; amount: number}) => {
  await update(props.budget.id, payload)
}
</script>

<template>
  <BudgetForm :budgetHeader="budgetHeader" :budget="budget" :onSubmit="handleSubmit" @success="emit('success')" />
</template>

<style scoped></style>
