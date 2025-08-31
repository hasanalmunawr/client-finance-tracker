<script setup lang="ts">
import type { Bank } from '@/types/models.ts'
import { useModal } from '@/composable/useModal.ts'
import EditBankAccount from '@/components/bankAccount/EditBankAccount.vue'
import { Modal } from '@/components/modal'
import { Eye, EyeOff} from 'lucide-vue-next';
import { ref } from 'vue'
import { formatRupiah } from '@/composable/useFormatRupiah.ts'

defineProps<{
  banks: Bank[]
}>()

const bank = defineModel<Bank>({ default: [] })

// Inisialisasi reactive map: index => boolean
const showNominalMap = ref<Record<number, boolean>>({})

const {isOpen, hideModal, modalTitle} = useModal();


// Fungsi toggle dengan tipe parameter eksplisit
const toggleNominal = (index: number): void => {
  showNominalMap.value[index] = !showNominalMap.value[index]
}

const onEdit = (item: Bank): void => {
  modalTitle.value = "Edit Bank Account"
  bank.value = item
  isOpen.value = true
}
const emit = defineEmits<{
  (e: 'success'): void
}>()

</script>

<template>
  <table class="min-w-full border rounded-lg overflow-hidden shadow-sm">
    <thead class="bg-gray-100 dark:bg-gray-800 text-sm font-semibold text-gray-700 dark:text-gray-300">
    <tr>
      <th class="px-4 py-2 text-left">Name</th>
      <th class="px-4 py-2 text-right">Number</th>
      <th class="px-4 py-2 text-right">Balance</th>
      <th class="px-4 py-2 text-center">Action</th>
    </tr>
    </thead>
    <tbody class="divide-y divide-gray-200 dark:divide-gray-700 text-sm">
    <tr v-for="(item, index) in banks" :key="index">
      <td class="px-4 py-2 text-left">{{ item.name }}</td>
      <td class="px-4 py-2 text-right">{{ item.number }}</td>
      <td class="relative px-4 py-2 text-right">
        {{ showNominalMap[index] ? formatRupiah(item.balance) : '**********' }}
        <span
          @click="toggleNominal(index)"
          class="absolute top-1/2 -translate-y-1/2 right-0 h-5 w-2 cursor-pointer text-blue-500"
        >
                    <Eye class="top-1/2" v-if="!showNominalMap[index]" />
                    <EyeOff v-else />
                </span>
      </td>
      <td class="px-4 py-2 text-center">
        <button
          class="text-blue-600 hover:underline"
          @click="onEdit(item)"
        >
          Edit
        </button>
      </td>
    </tr>
    </tbody>
  </table>


  <Modal :title="modalTitle" :is-open="isOpen" @close="hideModal" size="extra-large">
    <EditBankAccount :bank="bank" @success="() => {hideModal(); emit('success')}" />
  </Modal>
</template>

<style scoped>

</style>
