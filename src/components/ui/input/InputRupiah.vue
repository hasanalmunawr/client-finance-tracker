<script setup lang="ts">
import { ref, watch } from 'vue'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  modelValue: string | number
  placeholder?: string
  tabindex?: number
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const model = useVModel(props, 'modelValue', emits)

const inputValue = ref(String(model.value ?? ''))

// Saat v-model dari luar berubah, update input
watch(model, (val) => {
  inputValue.value = formatRupiah(String(val))
})

// Format rupiah: 1000 => "1.000"
function formatRupiah(value: string | number): string {
  const number = parseInt(String(value).replace(/\D/g, '') || '0')
  return number.toLocaleString('id-ID')
}

// Hapus semua non-digit
function unformat(value: string): string {
  return value.replace(/\D/g, '')
}

// Saat user input
function onInput(e: Event) {
  const target = e.target as HTMLInputElement
  const raw = unformat(target.value)
  inputValue.value = raw
  model.value = raw
}

// Saat blur → format
function onBlur() {
  inputValue.value = formatRupiah(inputValue.value)
}

// Saat focus → unformat
function onFocus() {
  inputValue.value = unformat(inputValue.value)
}
</script>

<template>
  <div class="flex items-center border border-input rounded-md bg-transparent dark:bg-input/30 h-10 w-full px-3 py-1 shadow-xs">
    <span class="mr-2 text-sm text-gray-500 dark:text-gray-400 select-none">Rp.</span>
    <input
      :value="inputValue"
      @input="onInput"
      @blur="onBlur"
      @focus="onFocus"
      :placeholder="placeholder"
      :tabindex="tabindex"
      class="w-full bg-transparent outline-none border-0 text-base md:text-sm placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed selection:bg-primary selection:text-primary-foreground"
    />
  </div>
</template>

<style scoped>

</style>
