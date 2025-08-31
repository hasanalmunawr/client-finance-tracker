import { h } from "vue"
import type { ColumnDef } from "@tanstack/vue-table"
import type { Payment } from "@/types/models"

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableSorting: true,
    cell: ({ row }) => h("div", { class: "font-mono" }, row.getValue("id")),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return h(Button, {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      }, () => ["Email", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })])
    },
    cell: ({ row }) => h("div", { class: "lowercase" }, row.getValue("email")),
  },
  /*{
    accessorKey: "email",
    header: "Email",
    enableSorting: true,
    cell: ({ row }) => h("div", {}, row.getValue("email")),
  },*/
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: true,
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return h(
        "span",
        {
          class:
            status === "success"
              ? "text-green-600 font-medium"
              : status === "failed"
                ? "text-red-600 font-medium"
                : "text-gray-600",
        },
        status
      )
    },
  },
  {
    accessorKey: "amount",
    header: () => h("div", { class: "text-right" }, "Amount"),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return h("div", { class: "text-right font-medium" }, formatted)
    },
  },
]
