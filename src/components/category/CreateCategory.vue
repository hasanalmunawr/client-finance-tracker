<script setup lang="ts">
import CategoryForm from '@/components/category/CategoryForm.vue'
import { create } from '@/services/category/category.ts'

const category = {
  id: 0,
  name: '',
  type: '',
}

const emit = defineEmits<{
  (e: 'success'): void
}>()

const handleSubmit = async (payload: { name: string; type: string }) => {
  await create(payload)
}
</script>

<template>
  <CategoryForm :category="category" :onSubmit="handleSubmit" @success="emit('success')" />
</template>

<style scoped></style>
