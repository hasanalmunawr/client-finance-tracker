<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { Input, InputRupiah } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { BudgetForm, BudgetHeader } from '@/types/models.ts'
import { onMounted, reactive, ref, watch, computed } from 'vue'
import { useCategoryStore } from '@/stores/category'
import { LoaderCircle } from 'lucide-vue-next'

// Props dengan tipe
const props = defineProps<{
  budget: Partial<BudgetForm>,
  budgetHeader: BudgetHeader,
  onSubmit: (payload: {budget_header_id: number; category_id: number; description: string; amount: number}) => Promise<void>
}>()

const formData = reactive({
  id: props.budget.id ?? 0,
  budget_header_id: props.budgetHeader.id ?? 0,
  category_id: props.budget.category_id ?? 0,
  description: props.budget.description ?? '',
  amount: props.budget.amount ?? 0,
})

// Tambahkan ini di bawahnya:
const balanceRaw = ref(String(props.budget.amount))

const isSubmitting = ref(false)
const submitForm = async () =>  {
  isSubmitting.value = true
  try {
    await props.onSubmit({ ...formData })
    emit('success')
  } catch (e) {
    alert(e);
  } finally {
    isSubmitting.value = false
  }
}

// Watcher props.category
watch(
  () => props.budget,
  (newBudget) => {
    formData.budget_header_id = props.budgetHeader.id || 0
    formData.category_id = newBudget.category_id || 0
    formData.description = newBudget.description || ''
    formData.amount = newBudget.amount || 0
    balanceRaw.value = String(newBudget.amount || '')
  },
  { deep: true, immediate: true }
)

// Konversi string angka ke integer
watch(balanceRaw, (val) => {
  formData.amount = parseInt(val || '0')
})
const emit = defineEmits<{
  (e: "success"): void
}>()

const categoryStore = useCategoryStore()

onMounted(() => {
  categoryStore.fetchCategories()
})

const categories = computed(() => categoryStore.categories)

</script>

<template>
  <form @submit.prevent="submitForm" class="flex flex-col gap-6">
    <div class="grid gap-6">

      <div class="grid gap-2">
        <Label for="name">Budget Category</Label>
        <select required v-model="formData.category_id"
                class="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800">
          <option disabled selected value="0">Select Category</option>
          <option :value="category.id" v-for="category in categories" :key="category.id">{{ category.name }}</option>
        </select>
      </div>

      <div class="grid gap-2">
        <Label for="name">Budget Description</Label>
        <Input
          id="name"
          type="text"
          required
          autofocus
          :tabindex="1"
          v-model="formData.description"
          placeholder="Enter Budget Description..."
        />
        <!--        <InputError :message="formData.errors.name" />-->
      </div>


      <div class="grid gap-2">
        <div class="flex items-center justify-between">
          <Label for="password">Budget Amount</Label>
        </div>
        <InputRupiah v-model="balanceRaw" placeholder="Amount" :tabindex="2" />
        <!--        <InputError :message="formData.errors.balance" />-->
      </div>

      <Button
        type="submit"
        class="w-full"
        :disabled="isSubmitting"
      >
        <LoaderCircle v-if="isSubmitting" class="h-4 w-4 animate-spin mr-2 inline" />
        Submit
      </Button>
    </div>
  </form>
</template>

<style scoped>

</style>
