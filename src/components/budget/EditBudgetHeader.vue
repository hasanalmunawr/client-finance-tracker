<script setup lang="ts">

import BudgetHeaderForm from '@/components/budget/BudgetHeaderForm.vue'
import type { BudgetHeader } from '@/types/models.ts'
import { updateBudgetHeader } from '@/services/budget/budgetHeader.ts'

const props = defineProps<{
  budgetHeader: BudgetHeader
}>()

const emit = defineEmits<{
  (e: 'success'): void
}>()

const handleSubmit = async (payload: { name: string; period: string; notes: string }) => {
  await updateBudgetHeader(props.budgetHeader.id, payload)
}
console.log("Header ", props.budgetHeader)
</script>

<template>
  <BudgetHeaderForm
    v-if="budgetHeader"
    :budgetHeader="budgetHeader" :onSubmit="handleSubmit" @success="emit('success')"
  />
</template>

<style scoped>

</style>
