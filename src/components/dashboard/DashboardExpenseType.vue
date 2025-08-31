<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { getDashboardSummaryCategory } from '@/services/dashboard/dashboard.ts'

// Tipe data
interface ExpenseCategoryItem {
  category: string
  category_total: number
  total_transactions: number
}

// State
const expense = ref<ExpenseCategoryItem[]>([])

const chartExpenseCategory = ref({
  title: {
    text: 'Expense Category',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: function (params: any) {
      const formattedValue = new Intl.NumberFormat('id-ID').format(params.value)
      return `${params.name}: Rp ${formattedValue} (${params.percent}%)`
    }
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Expense',
      type: 'pie',
      radius: '60%',
      data: [] as { name: string; value: number }[],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
})

const selectedMonth = ref<string>(new Date().toISOString().slice(0, 7))

// Load data dari API native
const loadExpenseByCategory = async () => {
  try {
    const [year, month] = selectedMonth.value.split('-')

    const response = await getDashboardSummaryCategory(year, month)

    const data = response.data.result || []

    expense.value = data

    chartExpenseCategory.value.series[0].data = data.map((item: ExpenseCategoryItem) => ({
      name: item.category,
      value: item.category_total
    }))
  } catch (error) {
    console.error('Gagal memuat data kategori pengeluaran:', error)
  }
}

// Auto load on change and on mount
watch(selectedMonth, loadExpenseByCategory)
onMounted(loadExpenseByCategory)
</script>

<template>
  <div class="w-full mx-auto p-4 rounded-[var(--radius-lg)] border bg-[var(--card)] text-[var(--card-foreground)] space-y-6">
    <!-- Picker -->
    <div>
      <label for="month-picker" class="block mb-2 text-sm font-medium text-muted-foreground">Pilih Bulan</label>
      <input
        id="month-picker"
        type="month"
        v-model="selectedMonth"
        class="border border-[var(--border)] bg-transparent text-[var(--card-foreground)]
             placeholder:text-muted-foreground rounded px-3 py-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>

    <!-- Chart -->
    <div class="h-96">
      <VChart class="w-full h-full" :option="chartExpenseCategory" autoresize />
    </div>

    <!-- Table -->
    <div class="overflow-x-auto p-4 rounded-[var(--radius-lg)] border bg-[var(--card)] shadow space-y-4">
      <h3 class="text-lg font-semibold text-[var(--card-foreground)]">Ringkasan Pengeluaran per Kategori</h3>

      <table class="min-w-full divide-y divide-[var(--border)] text-sm">
        <thead>
        <tr class="text-muted-foreground font-medium">
          <th class="px-4 py-2 text-left">Kategori</th>
          <th class="px-4 py-2 text-left">Total Pengeluaran</th>
          <th class="px-4 py-2 text-center">Jumlah Transaksi</th>
        </tr>
        </thead>
        <tbody class="divide-y divide-[var(--border)]">
        <tr
          v-for="exs in expense"
          :key="exs.category"
          class="hover:bg-muted/20 transition-colors"
        >
          <td class="px-4 py-2">{{ exs.category }}</td>
          <td class="px-4 py-2">
            Rp {{ parseFloat(exs.category_total.toString()).toLocaleString('id-ID') }}
          </td>
          <td class="px-4 py-2 text-center">{{ exs.total_transactions }}</td>
        </tr>
        </tbody>
        <tfoot class="bg-muted/30 font-semibold">
        <tr>
          <td class="px-4 py-2">Total</td>
          <td class="px-4 py-2">
            Rp {{
              expense.reduce((sum, exs) => sum + parseFloat(exs.category_total.toString()), 0)
                .toLocaleString('id-ID')
            }}
          </td>
          <td class="px-4 py-2 text-center">
            {{ expense.reduce((sum, exs) => sum + exs.total_transactions, 0) }}
          </td>
        </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<style scoped>
</style>
