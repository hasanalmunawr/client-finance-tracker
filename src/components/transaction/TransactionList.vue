<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import { Label } from '@/components/ui/label';
import Input from '../ui/input/Input.vue';
import { Button } from '@/components/ui/button'
import type { Transaction } from '@/types/models.ts'
import { getMine } from '@/services/transaction/transaction.ts'
import {useBankStore} from "@/stores/bank.ts";
import { Filter } from 'lucide-vue-next'

const transactions = defineModel<Transaction[]>('transactions', { default: [] })
const selectedBank = ref<number>(0);
const selectedMonth = ref(new Date().toISOString().slice(0, 7)); // format YYYY-MM

const formatDate = (datetime: string | number | Date, locale: string = 'id-ID'): string => {
  const date = new Date(datetime);
  return date.toLocaleString(locale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

const formatRupiah = (value: string | number) => {
  if (!value) return 'Rp. 0';
  return 'Rp. ' + Number(value).toLocaleString('id-ID');
};


const loadTransactions = async () => {
  try {
    const response = await getMine(selectedMonth.value, selectedBank.value)
    transactions.value = response.data.result
  } catch (error) {
    console.error('Failed to load categories', error)
  }
}



const bankStore = useBankStore()

onMounted(() => {
  bankStore.fetchBanks()
  loadTransactions()
})

const banks = computed(() => bankStore.banks)

const filterBtn = () => {
  loadTransactions();
}
// watch(selectedMonth, loadTransactions);
defineExpose({ loadTransactions })
</script>

<template>
  <!-- Filter -->
  <div
    class="px-6 py-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6
         bg-[var(--card)] rounded-xl shadow-md border border-[var(--border)]"
  >
    <!-- Filter: Period -->
    <div class="flex flex-col w-full sm:w-auto">
      <Label
        for="period"
        class="text-xs font-semibold text-[var(--muted-foreground)] mb-1"
      >
        Period
      </Label>
      <Input
        id="period"
        type="month"
        v-model="selectedMonth"
        class="bg-[var(--input)] text-[var(--input-foreground)] border border-[var(--border)]
             rounded-lg px-3 py-2 text-sm shadow-sm
             focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
      />
    </div>

    <!-- Filter: Bank Account -->
    <div class="flex flex-col w-full sm:w-auto">
      <Label
        for="account"
        class="text-xs font-semibold text-[var(--muted-foreground)] mb-1"
      >
        Bank Account
      </Label>
      <select
        id="account"
        v-model="selectedBank"
        class="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm
             bg-[var(--input)] text-[var(--input-foreground)] shadow-sm
             focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
      >
        <option value="0">All</option>
        <option v-for="bank in banks" :key="bank.id" :value="bank.id">
          {{ bank.name }}
        </option>
      </select>
    </div>

    <!-- Action Button -->
    <div class="flex">
      <Button
      @click="filterBtn"
      >
        <Filter />
        Apply Filter
      </Button>
    </div>
  </div>

  <!-- List Transaction    -->
  <ul class="divide-y divide-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)]">
    <li
      v-for="(item, index) in transactions"
      :key="index"
      class="flex justify-between items-center px-5 py-4 transition-colors hover:bg-muted"
    >
      <!-- Kiri: Info Transaksi -->
      <div>
        <p class="text-sm text-muted-foreground">
          {{ formatDate(item.date) }} – {{ item.from_bank_account_name }}
        </p>
        <p class="font-semibold text-[var(--card-foreground)]">
          {{ item.notes }}
        </p>
        <p class="text-sm text-muted-foreground">
          Category: {{ item.category }} | Jenis:
          <span
            :class="{
            'text-green-600 dark:text-green-400': item.type === 'Income',
            'text-red-600 dark:text-red-400': item.type === 'Expense',
            'text-blue-600 dark:text-blue-400': item.type === 'Mutation'
          }"
            class="capitalize font-medium"
          >
          {{ item.type }}
        </span>
        </p>
      </div>

      <!-- Kanan: Jumlah -->
      <div class="text-right">
        <p
          :class="{
          'text-green-600 dark:text-green-400': item.type === 'Income',
          'text-red-600 dark:text-red-400': item.type === 'Expense',
          'text-blue-600 dark:text-blue-400': item.type === 'Mutation'
        }"
          class="text-lg font-semibold"
        >
          <span v-if="item.type === 'Income'">+ {{ formatRupiah(item.amount) }}</span>
          <span v-else-if="item.type === 'Expense'">− {{ formatRupiah(item.amount) }}</span>
          <span v-else-if="item.type === 'Mutation'">→ {{ formatRupiah(item.amount) }}</span>
        </p>
      </div>
    </li>
  </ul>
</template>

<style scoped>

</style>
