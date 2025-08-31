<script setup lang="ts">
import AppLayout from '@/components/layouts/AppLayout.vue'
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button'
import { useModal } from '@/composable/useModal.ts'
import { Modal } from '@/components/modal'
import { CreateCategory, CategoryTable } from '@/components/category'
import { onMounted, ref } from 'vue'
import { getMine } from '@/services/category/category.ts'
import type { Category } from '@/types/models.ts'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Category',
    href: '/category',
  },
];
const categories = defineModel<Category[]>('categories', { default: [] })


const {isOpen, hideModal, modalTitle} = useModal();

const newCategory = () => {
  modalTitle.value = "New Category"
  isOpen.value = true
}

const loadCategories = async () => {
  try {
    const response = await getMine()
    categories.value = response.data.result
  } catch (error) {
    console.error('Failed to load categories', error)
  }
}
onMounted(loadCategories)
</script>

<template>
  <AppLayout :breadcrumbs="breadcrumbs">
    <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
      <div class="flex justify-end px-2">
        <Button @click="newCategory" >New Category</Button>
      </div>
      <div class="relative  rounded-xl md:min-h-min">
        <div class="relative min-h-[100vh] flex-1 rounded-xl">
          <CategoryTable :categories="categories" @success="loadCategories" />
        </div>
      </div>
    </div>
  </AppLayout>

  <Modal :title="modalTitle" :is-open="isOpen" @close="hideModal" size="extra-large">
    <CreateCategory @success="() => { hideModal(); loadCategories() }" />
  </Modal>
</template>

<style scoped>

</style>
