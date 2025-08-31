import { h } from 'vue'
import {Button} from '@/components/ui/button'
import type { Category } from "@/types/models.ts"
import type { ColumnDef } from '@tanstack/vue-table'
import DropdownAction from '@/components/dataTable/DataTableDropdown.vue'
import { ArrowUpDown } from 'lucide-vue-next'
import { Checkbox } from '@/components/ui/checkbox'
export const columns: ColumnDef<Category>[] = [
  {
    id: 'select',
    header: ({ table }) => h(Checkbox, {
      'modelValue': table.getIsAllPageRowsSelected(),
      'onUpdate:modelValue': (value: boolean) => table.toggleAllPageRowsSelected(!!value),
      'ariaLabel': 'Select all',
    }),
    cell: ({ row }) => h(Checkbox, {
      'modelValue': row.getIsSelected(),
      'onUpdate:modelValue': (value: boolean) => row.toggleSelected(!!value),
      'ariaLabel': 'Select row',
    }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      }, () => ['Name', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('name')),
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      }, () => ['Type', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('type')),
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => {
      return h(
        'div',
        { class: 'flex justify-end items-center' }, // ⬅️ kasih flex + justify
        [
          h(
            Button,
            {
              variant: 'ghost',
              onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
              class: 'flex items-center gap-2' // ⬅️ biar icon & text rapih
            },
            () => [
              'Created At',
              h(ArrowUpDown, { class: 'h-4 w-4' })
            ]
          )
        ]
      )
    },
    cell: ({ row }) =>
      h('div', { class: 'text-right' }, row.getValue('created_at')), // ✅ align kanan
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return h('div', { class: 'relative' }, h(DropdownAction, {
        payment,
        onExpand: row.toggleExpanded,
      }))
    },
  },
]
