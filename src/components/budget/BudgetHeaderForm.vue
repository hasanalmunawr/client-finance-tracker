<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-vue-next'
import { Label } from '@/components/ui/label'
import type { BudgetHeaderForm } from '@/types/models.ts'
import { onMounted, reactive, ref, watch } from 'vue'
import { useCategoryStore } from '@/stores/category.ts'



// Props dengan tipe
const props = withDefaults(defineProps<{
  budgetHeader: BudgetHeaderForm
  onSubmit?: (payload: { name: string; period: string; notes: string }) => Promise<void>
}>(), {
  onSubmit: async () => {}
})


const formData = reactive({
  id: props.budgetHeader.id ?? 0,
  name: props.budgetHeader.name ?? null,
  period: props.budgetHeader.period ?? '',
  notes: props.budgetHeader.notes ?? '',
})

const isSubmitting = ref(false)
const submitForm = async () =>  {
  isSubmitting.value = true
  try {
    if (typeof props.onSubmit === 'function') {
      await props.onSubmit({ ...formData })
      emit('success')
    } else {
      console.error('onSubmit is not a function', props.onSubmit)
    }
  } catch (e) {
    alert(e);
  } finally {
    isSubmitting.value = false
  }
}

// Watcher props.category
watch(
  () => props.budgetHeader,
  (newBudget) => {
    formData.name = newBudget.name || ''
    formData.period = newBudget.period || ''
    formData.notes = newBudget.notes || ''
  },
  { deep: true, immediate: true }
)


const emit = defineEmits<{
  (e: "success"): void
}>()

const categoryStore = useCategoryStore()

onMounted(() => {
  categoryStore.fetchCategories()
})

</script>

<template>
  <form @submit.prevent="submitForm" class="flex flex-col gap-6">
    <div class="grid gap-6">

      <div class="grid gap-2">
        <Label for="name">Name</Label>
        <Input
          id="name"
          type="text"
          required
          autofocus
          :tabindex="1"
          v-model="formData.name"
          placeholder="Enter Budget Description..."
        />
      </div>

      <div class="grid gap-2">
        <Label for="name">Period</Label>
        <Input
          id="name"
          type="text"
          required
          autofocus
          :tabindex="1"
          v-model="formData.period"
          placeholder="Enter Budget Description..."
        />
      </div>

      <div class="grid gap-2">
        <Label for="name">Note</Label>
        <Input
          id="name"
          type="text"
          required
          autofocus
          :tabindex="1"
          v-model="formData.notes"
          placeholder="Enter Budget Description..."
        />
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
