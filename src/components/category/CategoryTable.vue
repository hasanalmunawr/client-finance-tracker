<script setup lang="ts">
import type { Category } from '@/types/models.ts'
import { formatCreatedAt } from '@/composable/useFormatDateTime.ts'
import { Modal } from '@/components/modal'
import { useModal } from '@/composable/useModal.ts'
import { columns } from '@/components/category/columns.ts'
import EditCategory from '@/components/category/EditCategory.vue'
import DataTable from '@/components/dataTable/DataTable.vue'

const props = defineProps<{
  categories: Category[]
}>()

const category = defineModel<Category>({ default: [] })

const {isOpen, hideModal, modalTitle} = useModal();

const onEdit = (item: Category): void => {
  modalTitle.value = "Edit Category"
  category.value = item
  isOpen.value = true
}
const emit = defineEmits<{
  (e: 'success'): void
}>()

</script>

<template>
  <DataTable :columns="columns" :data="categories" />
<!--  <table class="min-w-full border rounded-lg overflow-hidden shadow-sm">-->
<!--    <thead class="bg-gray-100 dark:bg-gray-800 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">-->
<!--    <tr>-->
<!--      <th class="px-4 py-2">Name</th>-->
<!--      <th class="px-4 py-2">Name</th>-->
<!--      <th class="px-4 py-2">Type</th>-->
<!--      <th class="px-4 py-2 text-end">Created At</th>-->
<!--      <th class="px-4 py-2 text-center">Action</th>-->
<!--    </tr>-->
<!--    </thead>-->
<!--    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">-->
<!--    <tr v-for="(item, index) in categories" :key="index" class="text-sm">-->
<!--      <td class="px-4 py-2">{{ item }}</td>-->
<!--      <td class="px-4 py-2">{{ item.name }}</td>-->
<!--      <td class="px-4 py-2">{{ item.type }}</td>-->
<!--      <td class="px-4 py-2 text-end">{{ formatCreatedAt(item.created_at) }}</td>-->
<!--      <td class="px-4 py-2 text-center">-->
<!--        <button-->
<!--          class="text-blue-600 hover:underline text-sm"-->
<!--          @click="onEdit(item)"-->
<!--        >-->
<!--          Edit-->
<!--        </button>-->
<!--      </td>-->
<!--    </tr>-->
<!--    </tbody>-->
<!--  </table>-->

  <Modal :title="modalTitle" :is-open="isOpen" @close="hideModal" size="extra-large">
    <EditCategory :category="category" @success="() => {hideModal(); emit('success')}" />
  </Modal>
</template>

<style scoped>

</style>
