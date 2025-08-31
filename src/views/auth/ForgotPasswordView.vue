<script setup lang="ts">
import { reactive, ref } from 'vue'
import axios from 'axios';
import AuthBase from '@/components/layouts/AuthLayout.vue';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import InputError from '@/components/ui/input/InputError.vue'
import TextLink from '@/components/ui/link/TextLink.vue'
import { useAuthStore } from '@/stores/auth.ts'
import { LoaderCircle } from 'lucide-vue-next'

const authStore = useAuthStore();

const formData = reactive({
  email: '',
});

const isSubmitting = ref(false)
const submit = async () => {
  isSubmitting.value = true
  try {
    await authStore.forgotPassword(formData);
  } catch (e) {
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <AuthBase title="Forgot password" description="Enter your email which registered to receive a password reset link">
<!--    <Head title="Forgot password" />-->


    <div class="space-y-6">
      <form @submit.prevent="submit">
        <div class="grid gap-2">
          <Label for="email">Email address</Label>
          <Input id="email" type="email" name="email" autocomplete="off" v-model="formData.email" autofocus placeholder="email@example.com" />
<!--          <InputError :message="form.errors.email" />-->
        </div>

        <div class="my-6 flex items-center justify-start">
          <Button
            type="submit"
            class="w-full"
            :disabled="isSubmitting"
          >
            <LoaderCircle v-if="isSubmitting" class="h-4 w-4 animate-spin mr-2 inline" />
            Email password reset link
          </Button>
        </div>
      </form>

      <div class="space-x-1 text-center text-sm text-muted-foreground">
        <span>Or, return to</span>
        <TextLink route="login">log in</TextLink>
      </div>
    </div>
  </AuthBase>
</template>

<style scoped>

</style>
