<script setup lang="ts">
import CategoryForm from '@/components/category/CategoryForm.vue'
import { update } from '@/services/category/category.ts'
import type { Category } from '@/types/models.ts'

const props = defineProps<{
  category: Category
}>()

const emit = defineEmits<{
  (e: 'success'): void
}>()

const handleSubmit = async (payload: { name: string; type: string }) => {
  if (props.category.id) {
    await update(props.category.id, payload)
  }
}
</script>

<template>
  <CategoryForm :category="category" :onSubmit="handleSubmit" @success="emit('success')" />
</template>

<style scoped>

</style>
