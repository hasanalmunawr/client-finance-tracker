<script setup lang="ts">
import type { TransactionForm } from '@/types/models.ts'
import { Label } from '@/components/ui/label'
import { Input, InputRupiah, InputDate } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { LoaderCircle } from 'lucide-vue-next'
import { useBankStore } from '@/stores/bank.ts'
import { useCategoryStore } from '@/stores/category'

const props = defineProps<{
  transaction: TransactionForm
  onSubmit: (payload: {
    type: string;
    category_id: number;
    from_bank_account_id: number;
    to_bank_account_id: number;
    amount: number;
    notes: string;
    date: string;
  }) => Promise<void>
}>()

const emit = defineEmits<{
  (e: 'success'): void
}>()

const formData = reactive({
  type: props.transaction.type ?? '',
  category_id: props.transaction.category_id ?? 0,
  from_bank_account_id: props.transaction.from_bank_account_id ?? 0,
  to_bank_account_id: props.transaction.to_bank_account_id ?? 0,
  amount: props.transaction.amount ?? 0,
  notes: props.transaction.notes ?? '',
  date: props.transaction.date ?? null,
})
// Tambahkan ini di bawahnya:
const balanceRaw = ref(String(props.transaction.amount))

const isSubmitting = ref(false)
const submitForm = async () => {
  isSubmitting.value = true

  // Pastikan nilai to_bank_account_id jika bukan mutation
  if (formData.type !== 'Mutation') {
    formData.to_bank_account_id = formData.from_bank_account_id
  }

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

// Watcher props.debt
watch(
  () => props.transaction,
  (newTransaction) => {
    formData.type = newTransaction.type ?? ''
    formData.category_id = newTransaction.category_id ?? 0
    formData.from_bank_account_id = newTransaction.from_bank_account_id ?? 0
    formData.to_bank_account_id = newTransaction.to_bank_account_id ?? 0
    formData.amount = newTransaction.amount ?? 0
    formData.notes = newTransaction.notes ?? ''
    formData.date = newTransaction.date ?? null
  },
  { deep: true, immediate: true },
)
// Konversi string angka ke integer
watch(balanceRaw, (val) => {
  formData.amount = parseInt(val || '0')
})

const bankStore = useBankStore()
const categoryStore = useCategoryStore()

onMounted(() => {
  bankStore.fetchBanks()
})
onMounted(() => {
  categoryStore.fetchCategories()
})

const banks = computed(() => bankStore.banks)
const categories = computed(() => categoryStore.categories)

</script>

<template>
  <form @submit.prevent="submitForm" class="flex flex-col gap-6">

    <!-- Jenis Transaksi & Tanggal -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="grid gap-2">
        <Label for="type">Transaction Type</Label>
        <select
          id="type"
          v-model="formData.type"
          required
          class="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800"
        >
          <option disabled value="">Select Type</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
          <option value="Mutation">Mutation</option>
        </select>
      </div>

      <div class="grid gap-2">
        <Label for="date">Transaction Date</Label>
        <InputDate id="date" v-model="formData.date" required />
      </div>
    </div>

    <!-- Jika Transfer, tampilkan Rekening Asal dan Tujuan -->
    <div v-if="formData.type === 'Mutation'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="grid gap-2">
        <Label for="from">Source Account</Label>
        <select
          id="from"
          v-model="formData.from_bank_account_id"
          required
          class="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800"
        >
          <option disabled value="0">Select Bank Account</option>
          <option v-for="bank in banks" :key="bank.id" :value="bank.id">
            {{ bank.name }}
          </option>
        </select>
      </div>

      <div class="grid gap-2">
        <Label for="to">Destination Account</Label>
        <select
          id="to"
          v-model="formData.to_bank_account_id"
          required
          class="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800"
        >
          <option disabled value="0">Select Bank Account</option>
          <option v-for="bank in banks" :key="bank.id" :value="bank.id">
            {{ bank.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- Jika Income/Expense, hanya tampilkan satu rekening -->
    <div v-else class="grid gap-2">
      <Label for="account">Bank Account</Label>
      <select
        id="account"
        v-model="formData.from_bank_account_id"
        required
        class="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800"
      >
        <option disabled value="0">Select Bank Account</option>
        <option v-for="bank in banks" :key="bank.id" :value="bank.id">
          {{ bank.name }}
        </option>
      </select>
    </div>

    <!-- Nominal & Kategori -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="grid gap-2">
        <Label for="amount">Amount</Label>
        <InputRupiah
          id="amount"
          v-model="balanceRaw"
          required
        />
      </div>

      <div class="grid gap-2">
        <Label for="category">Category</Label>
        <select
          id="category"
          v-model="formData.category_id"
          required
          class="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800"
        >
          <option disabled value="0">Select Category</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- Deskripsi -->
    <div class="grid gap-2">
      <Label for="notes">Description</Label>
      <Input
        id="notes"
        type="text"
        v-model="formData.notes"
        placeholder="Contoh: Gaji bulan Juli, bayar tagihan listrik"
        required
      />
    </div>

    <!-- Tombol Submit -->
    <div class="mt-4">
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


<style scoped></style>
