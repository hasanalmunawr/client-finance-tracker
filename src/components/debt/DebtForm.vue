<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { Input, InputRupiah } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { DebtForm } from '@/types/models.ts'
import {Calendar} from '@/components/ui/calendar'
import { reactive, ref, watch } from 'vue'
import { LoaderCircle } from 'lucide-vue-next'

const props = defineProps<{
  debt: DebtForm
  onSubmit: (payload: {
    category_id: number;
    contact_name: string;
    amount: number;
    notes: string;
    due_date: string;
    type: string;
    is_paid: boolean;
  }) => Promise<void>
}>()
const emit = defineEmits<{
  (e: "success"): void
}>()
const formData = reactive({
  id: props.debt.id ?? 0,
  category_id: props.debt.category_id ?? 0,
  contact_name: props.debt.contact_name ?? '',
  amount: props.debt.amount ?? 0,
  notes: props.debt.notes ?? '',
  due_date: props.debt.due_date ?? '',
  type: props.debt.type ?? '',
  is_paid: props.debt.is_paid ?? false,
})
// Tambahkan ini di bawahnya:
const balanceRaw = ref(String(props.debt.amount))

const isSubmitting = ref(false)
const submitForm = async () =>  {
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

// Watcher props.debt
watch(
  () => props.debt,
  (newDebt) => {
    formData.category_id = newDebt.category_id ?? ''
    formData.contact_name = newDebt.contact_name ?? ''
    formData.amount = newDebt.amount ?? 0
    formData.notes = newDebt.notes ?? ''
    formData.due_date = newDebt.due_date ?? ''
    formData.type = newDebt.type ?? ''
    formData.is_paid = newDebt.is_paid ?? false
  },
  { deep: true, immediate: true }
)
// Konversi string angka ke integer
watch(balanceRaw, (val) => {
  formData.amount = parseInt(val || '0')
})

const selectedDate = ref<Date | undefined>()
</script>

<template>
  <form @submit.prevent="submitForm" class="flex flex-col gap-6">
    <div class="grid gap-6">

      <div class="grid gap-2">
        <Label for="name">Debt Name</Label>
        <Input
          id="name"
          type="text"
          required
          autofocus
          :tabindex="1"
          v-model="formData.contact_name"
          placeholder="Enter Budget Description..."
        />
        <!--        <InputError :message="formData.errors.name" />-->
      </div>

      <div class="grid gap-2">
        <Label for="name">Debt Type</Label>
        <select v-model="formData.type"
                required
                class="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800">
          <option disabled selected value="">Select Type</option>
          <option value="utang">Utang</option>
          <option value="piutang">Piutang</option>
        </select>
        <!--        <InputError :message="formData.errors.name" />-->
      </div>

      <div class="grid gap-2">
        <div class="flex items-center justify-between">
          <Label for="password">Amount</Label>
        </div>
        <InputRupiah required v-model="balanceRaw" placeholder="Amount" :tabindex="2" />
        <!--        <InputError :message="formData.errors.balance" />-->
      </div>

      <div class="grid gap-2">
        <Label for="name">Notes</Label>
        <Input
          id="name"
          type="text"
          required
          autofocus
          :tabindex="1"
          v-model="formData.notes"
          placeholder="Enter Budget Description..."
        />
        <!--        <InputError :message="formData.errors.name" />-->
      </div>

       <div class="grid gap-2">
        <Label for="name">Due Date</Label>
        <Input
          id="name"
          type="date"
          required
          autofocus
          :tabindex="1"
          v-model="formData.due_date"
          placeholder="Enter Budget Description..."
        />
         <Calendar v-model="selectedDate" class="p-3 rounded-md border shadow" />
         <p v-if="selectedDate">Tanggal dipilih: {{ selectedDate.toDateString() }}</p>
        <!--        <InputError :message="formData.errors.name" />-->
      </div>

      <div class="grid gap-2">
        <Label for="is_paid">Paid</Label>
        <div class="flex gap-4">
          <label class="inline-flex items-center gap-2">
            <input type="radio" v-model="formData.is_paid" value="true" />
            <span>True</span>
          </label>
          <label class="inline-flex items-center gap-2">
            <input type="radio" v-model="formData.is_paid" value="false" />
            <span>False</span>
          </label>
        </div>

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
