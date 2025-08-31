<script setup lang="ts">
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useInitials } from '@/composable/useInitials.ts'
import type { User } from '@/types'

// props biasa (tidak pakai Inertia)
interface Props {
  user: User | null
  showEmail?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showEmail: false,
})

const { getInitials } = useInitials()

</script>

<template>
  <Avatar class="h-8 w-8 overflow-hidden rounded-lg">
<!--    <AvatarImage v-if="showAvatar" :src="props.user.avatar" :alt="props.user.name" />-->
    <AvatarFallback class="rounded-lg text-black dark:text-white">
      {{ getInitials(props.user?.username) }}
    </AvatarFallback>
  </Avatar>

  <div class="grid flex-1 text-left text-sm leading-tight">
<!--    <span class="truncate font-medium">{{ props.user.name }}</span>-->
    <span class="truncate font-medium">{{ props.user?.username }}</span>
    <span v-if="props.showEmail" class="truncate text-xs text-muted-foreground">
      {{ props.user?.email }}
    </span>
    <span  class="truncate text-xs text-muted-foreground">

    </span>
  </div>
</template>

<style scoped>

</style>
