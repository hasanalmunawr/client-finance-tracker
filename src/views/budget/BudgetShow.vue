<script setup lang="ts">
import type { Budget, BudgetHeader } from '@/types/models.ts'
import { useModal } from '@/composable/useModal.ts'
import { getByHeaderId } from '@/services/budget/budget.ts'
import { onMounted } from 'vue'
import BudgetTable from '@/components/budget/BudgetTable.vue'
import { Modal } from '@/components/modal'
import { Button } from '@/components/ui/button'
import { CreateBudget } from '@/components/budget'

const props = defineProps<{
  budgetHeader: BudgetHeader
}>()
const budgets = defineModel<Budget[]>('budgets', { default: [] })

const {isOpen, hideModal, modalTitle} = useModal();

const newBudget = () => {
  modalTitle.value = "New Budget"
  isOpen.value = true
}

const loadBudgets = async () => {
  try {
    const response = await getByHeaderId(props.budgetHeader.id)
    console.log("Response budget Header List ", response.data)
    budgets.value = response.data.result
  } catch (error) {
    console.error('Failed to load categories', error)
  }
}
onMounted(loadBudgets)
</script>

<template>
  <div class="flex h-full flex-1 flex-col gap-4 rounded-xl">
    <div class="flex justify-end px-2">
      <Button @click="newBudget" >New Budget List</Button>
    </div>
    <div class="relative  rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
      <div class="relative min-h-[100vh] flex-1 rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
        <BudgetTable :budgetHeader="budgetHeader" :budgets="budgets"  @success="loadBudgets" />
      </div>
    </div>
  </div>
  <Modal :title="modalTitle" :is-open="isOpen" @close="hideModal" size="extra-large">
    <CreateBudget :budgetHeader="budgetHeader" @success="() => { hideModal(); loadBudgets() }" />
  </Modal>
</template>

<style scoped>

</style>
