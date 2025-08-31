<script setup lang="ts">
import AppLayout from '@/components/layouts/AppLayout.vue'
import SettingsLayout from '@/components/layouts/setting/SettingLayout.vue'
import HeadingSmall from '@/components/setting/HeadingSmall.vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { reactive, ref } from 'vue'
import { type BreadcrumbItem } from '@/types';
import { updatePassword } from '@/services/auth/user.ts'

const breadcrumbItems: BreadcrumbItem[] = [
  {
    title: 'Password settings',
    href: '/settings/password',
  },
];
const passwordInput = ref<HTMLInputElement | null>(null);
const currentPasswordInput = ref<HTMLInputElement | null>(null);

const form = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
});

const updatePasswordBtn = async () => {
  const isConfirmed = confirm("Are you sure you want to update the password?");
  if (!isConfirmed) return;

  if (form.newPassword !== form.confirmPassword) {
   alert("Password confirmation does not match!");
    return;
  }

  try {
    await updatePassword(form);
    // Optional: reset form
    form.oldPassword = '';
    form.newPassword = '';
    form.confirmPassword = '';
  } catch (error) {
    alert(error);
    console.error(error);
  }
};

</script>

<template>
  <AppLayout :breadcrumbs="breadcrumbItems">
<!--    <Head title="Password settings" />-->

    <SettingsLayout>
      <div class="space-y-6">
        <HeadingSmall title="Update password" description="Ensure your account is using a long, random password to stay secure" />

        <form @submit.prevent="updatePasswordBtn" class="space-y-6">
          <div class="grid gap-2">
            <Label for="old_password">Current password</Label>
            <Input
              id="old_password"
              ref="currentPasswordInput"
              v-model="form.oldPassword"
              type="password"
              class="mt-1 block w-full"
              autocomplete="current-password"
              placeholder="Current password"
            />
<!--            <InputError :message="form.errors.old_password" />-->
          </div>

          <div class="grid gap-2">
            <Label for="password">New password</Label>
            <Input
              id="password"
              ref="passwordInput"
              v-model="form.newPassword"
              type="password"
              class="mt-1 block w-full"
              autocomplete="new-password"
              placeholder="New password"
            />
<!--            <InputError :message="form.errors.password" />-->
          </div>

          <div class="grid gap-2">
            <Label for="password_confirmation">Confirm password</Label>
            <Input
              id="password_confirmation"
              v-model="form.confirmPassword"
              type="password"
              class="mt-1 block w-full"
              autocomplete="new-password"
              placeholder="Confirm password"
            />
<!--            <InputError :message="form.errors.password_confirmation" />-->
          </div>

          <div class="flex items-center gap-4">
            <Button>Save password</Button>
          </div>
        </form>
      </div>
    </SettingsLayout>
  </AppLayout>
</template>

<style scoped>

</style>
