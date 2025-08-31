<script setup lang="ts">
import { reactive, watch, ref } from 'vue'
import {InputRupiah} from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
// import { LoaderCircle } from 'lucide-vue-next';
// import {InputError} from '@/components/ui/input';
import { type BankForm } from '@/types/models'
import { LoaderCircle } from 'lucide-vue-next'


// Props dengan tipe
const props = defineProps<{
  bank: Partial<BankForm>
  onSubmit: (payload: { name: string; number: string; balance: number; }) => Promise<void>
}>()

const formData = reactive<BankForm>({
  id: props.bank.id ?? 0,
  name: props.bank.name ?? '',
  number: props.bank.number ?? '',
  balance: props.bank.balance ?? 0,
})

// Tambahkan ini di bawahnya:
const balanceRaw = ref(String(props.bank.balance))

const isSubmitting = ref(false)
const submitForm = async () => {
  isSubmitting.value = true
  try {
    await props.onSubmit({ ...formData })
    emit('success')
  } catch (e) {
    console.error(e)
    alert('Gagal menyimpan data')
  } finally {
    isSubmitting.value = false
  }
}

// Watcher biar form reactive ketika prop berubah
watch(
  () => props.bank,
  (newVal) => {
    formData.name = newVal.name ?? ''
    formData.number = newVal.number ?? ''
    formData.balance = newVal.balance ?? 0
  },
  { deep: true, immediate: true }
)

// Konversi string angka ke integer
watch(balanceRaw, (val) => {
  formData.balance = parseInt(val || '0')
})
const emit = defineEmits<{
  (e: "success"): void
}>()


</script>

<template>
  <form @submit.prevent="submitForm" class="flex flex-col gap-6">
    <div class="grid gap-6">
      <div class="grid gap-2">
        <Label for="name">Bank Account Name</Label>
        <Input
          id="name"
          type="text"
          required
          autofocus
          :tabindex="1"
          v-model="formData.name"
          placeholder="Enter Bank Name..."
        />
<!--        <InputError :message="formData.errors.name" />-->
      </div>

      <div class="grid gap-2">
        <div class="grid gap-2">
          <Label for="name">Bank Account Number</Label>
          <Input
            id="name"
            type="text"
            required
            autofocus
            :tabindex="1"
            v-model="formData.number"
            placeholder="Enter Bank Number..."
          />
<!--          <InputError :message="formData.errors.type" />-->
        </div>
      </div>

      <div class="grid gap-2">
        <div class="flex items-center justify-between">
          <Label for="password">Bank Account Balance</Label>
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
