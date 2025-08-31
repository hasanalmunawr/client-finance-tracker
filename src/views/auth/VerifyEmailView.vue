<script setup lang="ts">
import { ref, reactive } from 'vue';;
import { LoaderCircle } from 'lucide-vue-next';
import AuthBase from '@/components/layouts/AuthLayout.vue';
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import InputError from '@/components/ui/input/InputError.vue'
import TextLink from '@/components/ui/link/TextLink.vue'

const code = ref('')
const form = reactive({
  processing: false,
  error: '',
  errors: {} as Record<string, string>,
})

const submit = async () => {
  alert("hehe ga bisa ya")
  // form.processing = true;
  // form.errors = {};
  //
  // try {
  //   const response = await axios.post('/register', {
  //
  //   });
  //
  //   // Redirect or handle success
  //   window.location.href = response.data.redirect || '/dashboard';
  // } catch (error: any) {
  //   if (error.response?.status === 422) {
  //     form.errors = error.response.data.errors || {};
  //   }
  // } finally {
  //   form.processing = false;
  // }
};
</script>

<template>
  <AuthBase title="Verify Email" description="Enter the 6-digit verification code we sent to your email.">
<!--    <Head title="Email verification" />-->

    <form @submit.prevent="submit" class="space-y-6 text-center max-w-sm mx-auto">
      <input
        v-model="code"
        maxlength="6"
        type="text"
        placeholder="Enter 6-digit code"
        class="w-full text-center text-xl tracking-widest rounded-md border border-gray-300 py-2 px-4 focus:outline-none focus:ring focus:ring-blue-500"
      />

      <div v-if="form.error" class="text-sm text-red-600">{{ form.error }}</div>

      <Button :disabled="form.processing || code.length !== 6">
        <LoaderCircle v-if="form.processing" class="h-4 w-4 animate-spin" />
        Verify Code
      </Button>

      <TextLink route="login" method="post" as="button" class="mx-auto block text-sm">Log out</TextLink>
    </form>
  </AuthBase>
</template>

<style scoped>

</style>
