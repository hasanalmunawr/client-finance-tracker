<script setup lang="ts" generic="TData, TValue">
import { ref } from "vue"
import { type ColumnDef, getSortedRowModel } from "@tanstack/vue-table"
import { MoveDown, MoveUp} from 'lucide-vue-next'
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
} from "@tanstack/vue-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}>()

// ✅ state sorting
const sorting = ref([])

const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return props.columns
  },
  state: {
    get sorting() {
      return sorting.value
    },
  },
  onSortingChange: updater => {
    sorting.value = typeof updater === "function" ? updater(sorting.value) : updater
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
})
</script>

<template>
  <div class="border rounded-md">
    <Table>
      <TableHeader>
        <TableRow
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <TableHead
            v-for="header in headerGroup.headers"
            :key="header.id"
            class="cursor-pointer select-none"
            @click="header.column.getCanSort() ? header.column.toggleSorting() : null"
          >
            <div class="flex items-center gap-1">
              <!-- render header text -->
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />

              <!-- selalu tampilkan ikon, tapi warnanya berubah -->
              <MoveUp
                class="w-4 h-4"
                :class="header.column.getIsSorted() === 'asc' ? 'text-blue-400' : 'text-gray-400'"
              />
              <MoveDown
                class="w-4 h-4"
                :class="header.column.getIsSorted() === 'desc' ? 'text-blue-400' : 'text-gray-400'"
              />
            </div>
          </TableHead>


        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table.getRowModel().rows?.length">
          <TableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined"
          >
            <TableCell
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
            >
              <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
              />
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow>
            <TableCell
              :colspan="columns.length"
              class="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>
</template>
