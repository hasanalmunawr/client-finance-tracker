<script setup lang="ts">
import { Modal } from '@/components/modal'
import type { Debt } from '@/types/models.ts'
import { useModal } from '@/composable/useModal.ts'
import EditDebt from '@/components/debt/EditDebt.vue'
import { formatRupiah } from '@/composable/useFormatRupiah.ts'

defineProps<{
  debts: Debt[]
}>()

const debt = defineModel<Debt>({ default: [] })

const {isOpen, hideModal, modalTitle} = useModal();

const onEdit = (item: Debt): void => {
  modalTitle.value = "Edit Debt"
  debt.value = item
  isOpen.value = true
}
const emit = defineEmits<{
  (e: 'success'): void
}>()
</script>

<template>
  <table class="min-w-full border rounded-lg overflow-hidden shadow-sm">
    <thead class="bg-gray-100 dark:bg-gray-800 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
    <tr>
      <th class="px-4 py-2">Name</th>
      <th class="px-4 py-2">Type</th>
      <th class="px-4 py-2 text-end">Amount</th>
      <th class="px-4 py-2 text-start">Description</th>
      <th class="px-4 py-2 text-center">Due Date</th>
      <th class="px-4 py-2 text-center">Action</th>
    </tr>
    </thead>
    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
    <tr
      v-for="(item, index) in debts"
      :key="index"
      class="text-sm transition-colors"
      :class="{
        'bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300': item.is_paid,
        'bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-300': !item.is_paid
      }"
    >
      <td class="px-4 py-2 font-medium whitespace-nowrap">{{ item.contact_name }}</td>
      <td class="px-4 py-2 whitespace-nowrap">{{ item.type }}</td>
      <td class="px-4 py-2 text-end whitespace-nowrap">{{ formatRupiah(item.amount) }}</td>
      <td class="px-4 py-2 text-start">{{ item.notes }}</td>
      <td class="px-4 py-2 text-center whitespace-nowrap">{{ item.due_date }}</td>
      <td class="px-4 py-2 text-center">
        <button
          class="text-blue-600 dark:text-blue-400 hover:underline text-sm"
          @click="onEdit(item)"
        >
          Edit
        </button>
      </td>
    </tr>
    </tbody>
  </table>


  <Modal :title="modalTitle" :is-open="isOpen" @close="hideModal" size="extra-large">
    <EditDebt :debt="debt" @success="() => {hideModal(); emit('success')}" />
  </Modal>
</template>

<style scoped>

</style>
