<script setup lang="ts">
import type { Debt } from '@/types/models.ts'
import { computed } from 'vue'
import { formatRupiah } from '@/composable/useFormatRupiah.ts'

const props = defineProps<{
  debts: Debt[]
}>()

const totalPiutang = computed(() => {
  return props.debts
    .filter(item => item.type === 'piutang')
    .reduce((acc, curr) => acc + Number(curr.amount), 0)
})

const totalUtang = computed(() => {
  return props.debts
    .filter(item => item.type === 'utang')
    .reduce((acc, curr) => acc + Number(curr.amount), 0)
})

</script>

<template>
  <div class="grid gap-4 md:grid-cols-2 auto-rows-fr mt-2">
    <!-- Summary Piutang -->
    <div
      class="relative flex flex-col justify-between p-5 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-[var(--card)] text-[var(--card-foreground)] shadow-sm"
    >
      <div class="text-sm text-muted-foreground">Total Piutang</div>
      <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
        {{ formatRupiah(totalPiutang) }}
      </div>
    </div>

    <!-- Summary Utang -->
    <div
      class="relative flex flex-col justify-between p-5 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-[var(--card)] text-[var(--card-foreground)] shadow-sm"
    >
      <div class="text-sm text-muted-foreground">Total Utang</div>
      <div class="text-2xl font-bold text-orange-600 dark:text-orange-400">
        {{ formatRupiah(totalUtang) }}
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>
