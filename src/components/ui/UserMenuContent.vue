<script setup lang="ts">
import UserInfo from './UserInfo.vue';
import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import type { User } from '@/types';
import { RouterLink } from 'vue-router'
import { LogOut, Settings } from 'lucide-vue-next';
import { useAuthStore } from '@/stores/auth.ts'
import router from '@/router';

interface Props {
  user: User | null;
}

const handleLogout = async () => {

  await useAuthStore().logout()
  await router.push({ name: 'login' });
  window.location.reload();
};

defineProps<Props>();
</script>

<template>
  <DropdownMenuLabel class="p-0 font-normal">
    <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
      <UserInfo :user="user" :show-email="true" />
    </div>
  </DropdownMenuLabel>
  <DropdownMenuSeparator />
  <DropdownMenuGroup>
    <DropdownMenuItem :as-child="true">
      <RouterLink class="block w-full" to="/settings/profile" prefetch as="button">
        <Settings class="mr-2 h-4 w-4" />
        Settings
      </RouterLink>
    </DropdownMenuItem>
  </DropdownMenuGroup>
  <DropdownMenuSeparator />
  <DropdownMenuItem :as-child="true">
    <button class="block w-full" @click="handleLogout" type="button">
      <LogOut class="mr-2 h-4 w-4" />
      Log out
    </button>
  </DropdownMenuItem>
</template>

<style scoped>

</style>
