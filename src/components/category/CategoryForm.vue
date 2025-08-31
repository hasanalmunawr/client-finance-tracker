<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { CategoryForm } from '@/types/models.ts'
import { reactive, ref, watch } from 'vue'
import { LoaderCircle } from 'lucide-vue-next'

const props = defineProps<{
  category: CategoryForm
  onSubmit: (payload: { name: string; type: string }) => Promise<void>
}>()

const emit = defineEmits<{
  (e: 'success'): void
}>()

const formData = reactive({
  name: props.category.name ?? '',
  type: props.category.type ?? '',
})

const isSubmitting = ref(false)
const submitForm = async () => {
  isSubmitting.value = true
  try {
    await props.onSubmit({ ...formData })
    emit('success')
  } catch (e) {
    console.error(e);
    alert(e);
  } finally {
    isSubmitting.value = false
  }
}

// Watcher biar form reactive ketika prop berubah
watch(
  () => props.category,
  (newVal) => {
    formData.name = newVal.name ?? ''
    formData.type = newVal.type ?? ''
  },
  { deep: true, immediate: true }
)

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
        <!--        <InputError :message="formData.errors.name" />-->
      </div>

      <div class="grid gap-2">
        <Label for="name">Type</Label>
        <select required v-model="formData.type"
                class="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800">
          <option disabled selected value="">Select Type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
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
