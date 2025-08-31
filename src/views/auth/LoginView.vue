<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, reactive, ref } from 'vue'
import { useAuthStore } from "@/stores/auth";
import AuthBase from '@/components/layouts/AuthLayout.vue'
import { Input, InputError } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import TextLink from '@/components/ui/link/TextLink.vue'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-vue-next'

const { errors } = storeToRefs(useAuthStore());

const authStore = useAuthStore();

interface LoginRequest {
  email: string
  password: string
  remember: boolean
}

// Form state
const formData = reactive<LoginRequest>({
  email: '',
  password: '',
  remember: false,
})
const errorMsg = ref('')
// Submit function
const isSubmitting = ref(false)
const submit = async () => {
  isSubmitting.value = true
  try {
    await authStore.authenticate(formData);
  } catch (e: any) {
    // alert("Error : " + e.message)
    console.error(e.message)
  } finally {
    isSubmitting.value = false
  }
}

// onMounted(() => (errors.value = {}));
</script>

<template>
  <AuthBase
    title="Log in to your account"
    description="Enter your email and password below to log in"
  >
    <form @submit.prevent="submit" class="flex flex-col gap-6">
      <div v-if="errorMsg">
        {{ authStore.errors }}
      </div>
      <div class="grid gap-6">
        <div class="grid gap-2">
          <Label for="email">Email address</Label>
          <Input
            id="email"
            type="email"
            required
            autofocus
            :tabindex="1"
            autocomplete="email"
            v-model="formData.email"
            placeholder="email@example.com"
          />
          <InputError :message="errorMsg" />
        </div>

        <div class="grid gap-2">
          <div class="flex items-center justify-between">
            <Label for="password">Password</Label>
            <TextLink route="/forgot-password" class="text-sm" :tabindex="5">
              Forgot password?
            </TextLink>
          </div>
          <Input
            id="password"
            type="password"
            required
            :tabindex="2"
            autocomplete="current-password"
            v-model="formData.password"
            placeholder="Password"
          />
<!--          <InputError :message="errors.password[0]" />-->
        </div>

        <div class="flex items-center justify-between">
          <Label for="remember" class="flex items-center space-x-3">
            <Checkbox id="remember" v-model="formData.remember" :tabindex="3" />
            <span>Remember me</span>
          </Label>
        </div>

        <Button
          type="submit"
          class="w-full"
          :disabled="isSubmitting"
        >
          <LoaderCircle v-if="isSubmitting" class="h-4 w-4 animate-spin mr-2 inline" />
          Log in
        </Button>
      </div>
    </form>
  </AuthBase>
</template>

<style scoped></style>
