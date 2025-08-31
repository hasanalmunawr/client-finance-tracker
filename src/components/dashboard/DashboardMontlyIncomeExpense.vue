<script setup lang="ts">

// Tipe struktur chart
import { onMounted, ref } from 'vue'
import { getDashboardSummaryTransaction } from '@/services/dashboard/dashboard.ts'
// import type { MonthlyTransactionItem } from '@/types/models.ts'

type TransactionType = 'Income' | 'Expense'

interface MonthlyTransaction {
  month: number
  year: number
  type: TransactionType
  total_amount: number | string
}


interface ChartOption {
  title: { text: string; left: string }
  tooltip: {
    trigger: string
    axisPointer: { type: string }
  }
  legend: {
    data: string[]
    top: string
  }
  grid: {
    left: string
    right: string
    bottom: string
    containLabel: boolean
  }
  xAxis: {
    type: string
    data: string[]
  }
  yAxis: {
    type: string
  }
  series: {
    name: string
    type: string
    data: number[]
    itemStyle: { color: string }
  }[]
}

// Chart config (ref with typed value)
const chartMonthlyTransaction = ref<ChartOption>({
  title: {
    text: 'Monthly Income & Expense',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {
    data: ['Income', 'Expense'],
    top: 'bottom',
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '10%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: [],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: 'Income',
      type: 'bar',
      data: [],
      itemStyle: { color: '#16a34a' }, // green-600
    },
    {
      name: 'Expense',
      type: 'bar',
      data: [],
      itemStyle: { color: '#dc2626' }, // red-600
    },
  ],
})


// const monthlyTransactionItems = defineModel<MonthlyTransactionItem[]>('monthlyTransactionItems', { default: [] })


const loadMonthlyTransaction = async () => {
  try {
    const response = await getDashboardSummaryTransaction()
    const monthlyData: MonthlyTransaction[] = response.data.result
    console.log("montlidata", monthlyData);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const grouped: Record<string, { Income: number; Expense: number }> = {}

    for (const item of monthlyData) {
      const label = monthNames[item.month - 1] + ' ' + item.year
      if (!grouped[label]) grouped[label] = { Income: 0, Expense: 0 }
      grouped[label][item.type] = parseFloat(String(item.total_amount))
    }

    const labels = Object.keys(grouped)
    chartMonthlyTransaction.value.xAxis.data = labels
    chartMonthlyTransaction.value.series[0].data = labels.map(l => grouped[l].Income)
    chartMonthlyTransaction.value.series[1].data = labels.map(l => grouped[l].Expense)

  } catch (e) {
    console.error('Failed to load data:', e)
  }
}

onMounted(() => {
  loadMonthlyTransaction()
})

</script>

<template>
  <div class="w-full h-auto pt-4">
    <div class="h-96">
      <v-chart class="w-full h-96" :option="chartMonthlyTransaction" autoresize/>
    </div>
  </div>
</template>

<style scoped>

</style>
