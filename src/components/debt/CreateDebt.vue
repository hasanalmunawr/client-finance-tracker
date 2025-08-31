<script setup lang="ts">
import DebtForm from '@/components/debt/DebtForm.vue'
import { create } from '@/services/debt/debt.ts'

const debt = {
  id: 0,
  category_id: 0,
  contact_name: '' ,
  amount:  0,
  notes: '' ,
  due_date: '',
  type: '' ,
  is_paid: false,
}
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
  await create(payload)
}
</script>

<template>
 <DebtForm :debt="debt" :onSubmit="handleSubmit" @success="emit('success')" />
</template>

<style scoped>

</style>
