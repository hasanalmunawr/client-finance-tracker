<script setup lang="ts">
import type { Budget, BudgetHeader } from '@/types/models.ts'
import { useModal } from '@/composable/useModal.ts'
import { deleteBudgetHeader } from '@/services/budget/budgetHeader.ts'
import { Modal } from '@/components/modal'
import EditBudgetHeader from '@/components/budget/EditBudgetHeader.vue'
import { getMine } from '@/services/budget/budget.ts'
import { onMounted, ref } from 'vue'
import BudgetShow from '@/views/budget/BudgetShow.vue'
defineProps<{
  budgetHeaders: BudgetHeader[]
}>()

const emit = defineEmits<{
  (e: 'success'): void
}>()

const budgetHeader = defineModel<BudgetHeader>({ default: [] })
const budgets = defineModel<Budget[]>('budgets', { default: [] })
const {isOpen, hideModal, modalTitle} = useModal();
const activeHeaderModal = ref(false)


const onEdit = (item: BudgetHeader): void => {
  modalTitle.value = "Edit Budget"
  budgetHeader.value = item
  activeHeaderModal.value = true
  isOpen.value = true
}

const onShow = (item: BudgetHeader): void => {
  modalTitle.value = "Budget " +  '(' + item.name + ')'
  budgetHeader.value = item
  activeHeaderModal.value = false
  isOpen.value = true
}

const onDelete = async (item: BudgetHeader): Promise<void> => {
  if (confirm(`Are you sure you want to delete this Budget Group ${item.name}?`)) {
    try {
      await deleteBudgetHeader(item.id)
      emit('success')
    } catch (error) {
      console.error('Failed to delete budget header', error)
    }
  }
}

const loadBudgets = async () => {
  try {
    const response = await getMine()
    budgets.value = response.data.result.data
  } catch (error) {
    console.error('Failed to load categories', error)
  }
}
onMounted(loadBudgets)
</script>

<template>
  <table class="min-w-full border rounded-lg overflow-hidden shadow-sm">
    <thead class="bg-gray-100 dark:bg-gray-800 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
    <tr>
      <th class="px-4 py-2">Name</th>
      <th class="px-4 py-2 text-start">Period</th>
      <th class="px-4 py-2 text-end">Notes</th>
      <th class="px-4 py-2 text-center">Action</th>
    </tr>
    </thead>
    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
    <tr v-for="(item, index) in budgetHeaders" :key="index" class="text-sm">
      <td class="px-4 py-2">{{ item.name }}</td>
      <td class="px-4 py-2 text-start">{{ item.period }}</td>
      <td class="px-4 py-2 text-end">{{ item.notes }}</td>
      <td class="px-4 py-2 text-center space-x-2">
        <button
          class="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs font-medium rounded"
          @click="onEdit(item)"
        >
          Edit
        </button>
        <button
          class="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs font-medium rounded"
          @click="onShow(item)"
        >
          Show List
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
  </table>

  <Modal :title="modalTitle" :is-open="isOpen" @close="hideModal" :size="activeHeaderModal ? 'extra-large' : 'max-w-5xl'" >
    <EditBudgetHeader v-if="activeHeaderModal" :budgetHeader="budgetHeader" @success="() => {hideModal(); emit('success') }" />
    <BudgetShow v-else :budgetHeader="budgetHeader"  />
  </Modal>
</template>

<style scoped>

</style>
