<script setup lang="ts">
  import TrelloLogo from '@/assets/trello_logo.png'
  import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'

  const router = useRouter()

  const handleClick = () => {
    router.push('/')
  }
</script>

<template>
  <SidebarMenu @click="handleClick">
    <SidebarMenuItem>
      <SidebarMenuButton size="lg" class="cursor-default">
        <div
          class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
        >
          <img :src="TrelloLogo" alt="Trello" class="size-6" />
        </div>
        <div class="grid flex-1 text-left text-sm leading-tight">
          <span class="truncate font-semibold"> Trello </span>
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
