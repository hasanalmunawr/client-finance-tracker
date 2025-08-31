<script setup lang="ts">
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { useRoute, RouterLink } from 'vue-router'
import { ref, onMounted} from 'vue'

defineProps<{
  items: NavItem[];
}>();

// const route = useRoute()
const route = ref()
onMounted(() => {
  route.value = useRoute()
})
</script>

<template>
  <SidebarGroup class="px-2 py-0">
    <SidebarGroupLabel>Platform</SidebarGroupLabel>
    <SidebarMenu>
      <SidebarMenuItem v-for="item in items" :key="item.title">
        <SidebarMenuButton
          as-child
          :is-active="item.href === route?.path"
          :tooltip="item.title"
        >
          <RouterLink :to="item.href">
            <component :is="item.icon" />
            <span>{{ item.title }}</span>
          </RouterLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>

<style scoped>

</style>
