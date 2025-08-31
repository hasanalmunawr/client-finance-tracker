<script setup lang="ts">
import DebtForm from '@/components/debt/DebtForm.vue'
import type { Debt } from '@/types/models.ts'
import { update } from '@/services/debt/debt.ts'

const props = defineProps<{
  debt: Debt
}>()

const emit = defineEmits<{
  (e: 'success'): void
}>()

const handleSubmit = async (payload: {
  category_id: number;
  contact_name: string;
  amount: number;
  notes: string;
  due_date: string;
  type: string;
  is_paid: boolean;
}) => {
  await update(props.debt.id, payload)
}
</script>

<template>
  <DebtForm :debt="debt" :onSubmit="handleSubmit" @success="emit('success')" />
</template>

<style scoped>

</style>
