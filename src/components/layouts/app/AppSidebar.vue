<script setup lang="ts">
import NavFooter from '@/components/nav/NavFooter.vue'
import NavMain from '@/components/nav/NavMain.vue'
import NavUser from '@/components/nav/NavUser.vue'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { type NavItem } from '@/types'
import { RouterLink } from 'vue-router'
import { LayoutGrid, ArrowLeftRight, CreditCard, Layers, BadgeDollarSign, Calculator, Monitor } from 'lucide-vue-next'
import AppLogo from '@/components/icons/AppLogo.vue'

const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutGrid,
  },
  {
    title: 'transaction',
    href: '/transaction',
    icon: ArrowLeftRight,
  },
  {
    title: 'Bank Account',
    href: '/bank-account',
    icon: CreditCard,
  },
  {
    title: 'Asset',
    href: '/asset',
    icon: Monitor,
  },
  {
    title: 'Budget',
    href: '/budget',
    icon: Calculator,
  },

  {
    title: 'Category',
    href: '/category',
    icon: Layers,
  },
  {
    title: 'Debt',
    href: '/debt',
    icon: BadgeDollarSign,
  },
]

const footerNavItems: NavItem[] = [
  // {
  //     title: 'Github Repo',
  //     href: 'https://github.com/laravel/vue-starter-kit',
  //     icon: Folder,
  // },
]
</script>

<template>
  <Sidebar collapsible="icon" variant="inset">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" as-child>
            <RouterLink to="/">
              <AppLogo />
            </RouterLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>

    <SidebarContent>
      <NavMain :items="mainNavItems" />
    </SidebarContent>

    <SidebarFooter>
      <NavFooter :items="footerNavItems" />
      <NavUser />
    </SidebarFooter>
  </Sidebar>
  <slot />
</template>

<style scoped></style>
