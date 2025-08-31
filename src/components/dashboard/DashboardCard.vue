<script setup lang="ts">
import { Label } from '@/components/ui/label';
import { onMounted, ref, watch, computed } from 'vue';
import {Calendar} from '@/components/ui/calendar'
import {
  getAvgSpending,
  getCashFlow,
  getTotalExpense,
  getTotalIncome
} from '@/services/dashboard/dashboard.ts'


interface TotalIncome {
  income: number;
  increase: boolean;
  percent: number;
}

interface TotalExpense {
  expense: number;
  increase: boolean;
  percent: number;
}

interface CashFlow {
  cash_flow: number;
  percent: number;
}

const cashFlow = ref<CashFlow | null>(null);
const totalIncome = ref<TotalIncome | null>(null);
const totalExpense = ref<TotalExpense | null>(null);

const selectedMonth = ref<string>(new Date().toISOString().slice(0, 7)); // format YYYY-MM

const expenseIsIncrease = ref<boolean>(true);

const avgSpending = ref<number>(0);

const formatRupiah = (value: string | number) => {
  if (!value) return 'Rp. 0';
  return 'Rp. ' + Number(value).toLocaleString('id-ID');
};

const loadTotalIncome = async () => {
  const [year, month] = selectedMonth.value.split('-')
  try {
    const response = await getTotalIncome(year, month);
    totalIncome.value = response.data.result;
    console.log("Income loaded ", totalIncome.value);
  } catch (error) {
    console.error('Failed to load avg spending:', error);
  }
};


const loadTotalExpense = async () => {
  const [year, month] = selectedMonth.value.split('-')
  try {
    const response = await getTotalExpense(year, month);
    totalExpense.value = response.data.result;
    console.log("Expense loaded ", totalExpense.value);
  } catch (error) {
    console.error('Failed to load avg spending:', error);
  }
};


const loadAvgSpending = async () => {
  const [year, month] = selectedMonth.value.split('-')
  try {
    const response = await getAvgSpending(year, month);
    avgSpending.value = response.data.result;
  } catch (error) {
    console.error('Failed to load avg spending:', error);
  }
}

const loadCashFlow = async () => {
  const [year, month] = selectedMonth.value.split('-')
  try {
    const response = await getCashFlow(year, month);
    cashFlow.value = response.data.result;
  } catch (error) {
    console.error('Failed to load avg spending:', error);
  }
}

const loadAllData = () => {
  loadTotalIncome()
  loadTotalExpense()
  loadAvgSpending()
  loadCashFlow()
}

watch(selectedMonth, loadAllData, { immediate: true })

onMounted(() => {
 loadAllData()
})

</script>

<template>
  <div class="flex flex-col gap-1 w-full sm:w-auto mb-2">
    <Label for="period">
      Period:
    </Label>
    <input
      id="period"
      type="month"
      v-model="selectedMonth"
      class="bg-[var(--input)] text-[var(--input-foreground)] border border-[var(--border)] rounded-[var(--radius-md)] px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
    />
  </div>
  <div class="grid gap-4 md:grid-cols-4 auto-rows-fr">
    <div
      v-if="totalIncome"
      class="relative flex flex-col justify-between p-5 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-[var(--card)] text-[var(--card-foreground)] shadow-sm"
    >
      <div class="text-sm text-muted-foreground">Total Income</div>
      <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ formatRupiah(totalIncome?.income) }}</div>
      <div class="text-sm font-medium"
           :class="totalIncome?.increase ? 'text-green-500' : 'text-red-500'">
        {{ totalIncome?.increase ? '▲' : '▼' }} {{ totalIncome?.percent }}% from last month
      </div>
    </div>

    <div
      v-if="totalExpense"
      class="relative flex flex-col justify-between p-5 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-[var(--card)] text-[var(--card-foreground)] shadow-sm"
    >
      <div class="text-sm text-muted-foreground">Total Expense</div>
      <div class="text-2xl font-bold text-red-600 dark:text-red-400">{{ formatRupiah(totalExpense.expense)}}</div>
      <div class="text-sm font-medium"
           :class="totalExpense?.increase ? 'text-red-500' : 'text-green-500'">
        {{ totalExpense?.increase ? '▲' : '▼' }} {{ totalExpense?.percent }}% from last month
      </div>
    </div>

<!--    <div-->
<!--      class="relative flex flex-col justify-between p-5 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-[var(&#45;&#45;card)] text-[var(&#45;&#45;card-foreground)] shadow-sm"-->
<!--    >-->
<!--      <div class="text-sm text-muted-foreground">Total Expense</div>-->
<!--      <div class="text-2xl font-bold text-red-600 dark:text-red-400">{{ formatRupiah(totalExpense)}}</div>-->
<!--      <div class="text-sm font-medium"-->
<!--           :class="expenseIsIncrease ? 'text-red-500' : 'text-green-500'">-->
<!--        {{ expenseIsIncrease ? '▲' : '▼' }} {{ expenseChangePercent }}% from last month-->
<!--      </div>-->
<!--    </div>-->


    <div
      v-if="cashFlow"
      class="relative flex flex-col justify-between p-5 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-[var(--card)] text-[var(--card-foreground)] shadow-sm"
    >
      <div class="text-sm text-muted-foreground">Cash Flow</div>
      <div class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{{ formatRupiah(cashFlow.cash_flow) }}</div>
      <div
        class="text-sm font-medium text-yellow-500"
      > {{ expenseIsIncrease ? '▲' : '▼' }} {{ cashFlow?.percent }}% from current income
      </div>
    </div>

    <div
      class="relative flex flex-col justify-between p-5 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-[var(--card)] text-[var(--card-foreground)] shadow-sm"
    >
      <div class="text-sm text-muted-foreground">Monthly Avg Spending</div>
      <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{formatRupiah(avgSpending)}}</div>
      <div class="text-sm font-medium text-purple-500">≈ Stable</div>
    </div>
  </div>
</template>

<style scoped>

</style>
