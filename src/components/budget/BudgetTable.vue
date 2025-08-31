<script setup lang="ts">
import { Modal } from '@/components/modal'
import type { Budget, BudgetHeader } from '@/types/models.ts'
import { useModal } from '@/composable/useModal.ts'
import { formatRupiah } from '@/composable/useFormatRupiah.ts'
import EditBudget from '@/components/budget/EditBudget.vue'
import { deleteBudget } from '@/services/budget/budget.ts'
import { computed } from 'vue'

const props = defineProps<{
  budgets: Budget[]
  budgetHeader: BudgetHeader
}>()

const emit = defineEmits<{
  (e: 'success'): void
}>()

const budget = defineModel<Budget>({ default: [] })

const totalExpense = computed(() => {
  return props.budgets
    .reduce((acc, curr) => acc + Number(curr.amount), 0)
})

const {isOpen, hideModal, modalTitle} = useModal();

const onEdit = (item: Budget): void => {
  modalTitle.value = "Edit Budget"
  budget.value = item
  isOpen.value = true
}

const onDelete = async (item: Budget): Promise<void> => {
  if (confirm(`Are you sure you want to delete this Budget ${item.category.name} ?`)) {
    try {
      await deleteBudget(item.id) // tunggu sampai selesai
      emit('success') // reload setelah delete benar-benar selesai
    } catch (err) {
      console.error('Failed to delete budget', err)
    }
  }
}


</script>

<template>
  <table class="min-w-full border rounded-lg overflow-hidden shadow-sm">
    <thead class="bg-gray-100 dark:bg-gray-800 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
    <tr>
      <th class="px-4 py-2">Name</th>
      <th class="px-4 py-2 text-start">Description</th>
      <th class="px-4 py-2 text-end">Amount</th>
      <th class="px-4 py-2 text-center">Action</th>
    </tr>
    </thead>
    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
    <tr v-for="(item, index) in budgets" :key="index" class="text-sm">
      <td class="px-4 py-2">{{ item.category.name }}</td>
      <td class="px-4 py-2 text-start">{{ item.description }}</td>
      <td class="px-4 py-2 text-end">{{ formatRupiah(item.amount) }}</td>
      <td class="px-4 py-2 text-center space-x-2">
        <button
          class="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs font-medium rounded"
          @click="onEdit(item)"
        >
          Edit
        </button>
        <button
          class="inline-flex items-center px-2 py-1 bg-red-100 text-red-700 hover:bg-red-200 text-xs font-medium rounded"
          @click="onDelete(item)"
        >
          Delete
        </button>
      </td>

    </tr>
    </tbody>
    <tfoot class="bg-gray-50 dark:bg-gray-900 text-sm font-semibold text-gray-700 dark:text-gray-300 border-t dark:border-gray-700">
    <tr>
      <td colspan="2" class="px-4 py-2 text-left">Total:</td>
      <td class="px-4 py-2 text-right">{{ formatRupiah(totalExpense) }}</td>
      <td></td>
    </tr>
    </tfoot>
  </table>

    <Modal :title="modalTitle" :is-open="isOpen" @close="hideModal" size="extra-large">
      <EditBudget :budgetHeader="budgetHeader" :budget="budget" @success="() => {hideModal(); emit('success')}" />
    </Modal>
</template>

<style scoped>

</style>
