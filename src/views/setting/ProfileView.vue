<script setup lang="ts">
import AppLayout from '@/components/layouts/AppLayout.vue'
import { type BreadcrumbItem } from '@/types'
// import InputError from '@/components/ui/input/InputError.vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import HeadingSmall from '@/components/setting/HeadingSmall.vue'
import SettingsLayout from '@/components/layouts/setting/SettingLayout.vue'
import { Button } from '@/components/ui/button'
import { reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { updateProfile } from '@/services/auth/user.ts'
import { LoaderCircle } from 'lucide-vue-next'

const authStore = useAuthStore()

const formData = reactive({
  username: authStore.user?.username ?? '',
  email: authStore.user?.email ?? '',
})

const isSubmitting = ref(false)
const submit = async () => {
  isSubmitting.value = true
  try {
    await updateProfile(formData);
  } catch (e: any) {
    alert("Error : " + e.message)
  } finally {
    isSubmitting.value = false
  }
}

const breadcrumbItems: BreadcrumbItem[] = [
  {
    title: 'Profile settings',
    href: '/settings/profile',
  },
];
</script>

<template>
  <AppLayout :breadcrumbs="breadcrumbItems">
    <!--    <Head title="Profile settings" />-->
    <SettingsLayout>
      <div class="flex flex-col space-y-6">
        <HeadingSmall
          title="Profile information"
          description="Update your name and email address"
        />

        <form @submit.prevent="submit" class="space-y-6">
          <div class="grid gap-2">
            <Label for="name">Name</Label>
            <Input
              id="name"
              class="mt-1 block w-full"
              v-model="formData.username"
              required
              autocomplete="name"
              placeholder="Full name"
            />
            <!--            <InputError class="mt-2" :message="form.errors.name" />-->
          </div>

          <div class="grid gap-2">
            <Label for="email">Email address</Label>
            <Input
              id="email"
              type="email"
              class="mt-1 block w-full"
              v-model="formData.email"
              required
              disabled
              autocomplete="username"
              placeholder="Email address"
            />
            <!--            <InputError class="mt-2" :message="form.errors.email" />-->
          </div>
          <div class="flex items-center gap-4">
            <Button
              type="submit"
              :disabled="isSubmitting"
            >
              <LoaderCircle v-if="isSubmitting" class="h-4 w-4 animate-spin mr-2 inline" />
              Save
            </Button>
          </div>
        </form>
      </div>
    </SettingsLayout>
  </AppLayout>
</template>

<style scoped></style>
