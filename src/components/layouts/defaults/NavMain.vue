<script setup lang="ts">
  import { ref } from 'vue'
  import { type LucideIcon } from 'lucide-vue-next'

  import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from '@/components/ui/sidebar'

  import WorkspaceDialog from '@/components/dialogs/WorkspaceDialog.vue'
  import BoardDialog from '@/components/dialogs/BoardDialog.vue'

  defineProps<{
    projects: {
      name: string
      url: string
      icon: LucideIcon
      isDialog?: boolean
    }[]
  }>()

  const isDialogOpen = ref(false)
  const activeDialog = ref<'workspace' | 'board' | null>(null)

  const handleItemClick = (item: {
    name: string
    url: string
    icon: LucideIcon
    isDialog?: boolean
    form?: 'workspace' | 'board'
  }) => {
    if (item.isDialog) {
      isDialogOpen.value = true
      activeDialog.value =
        item.form ?? (item.name.toLowerCase().includes('board') ? 'board' : 'workspace')
    } else {
      // Navigate to other items
      window.location.href = item.url
    }
  }
</script>

<template>
  <SidebarGroup class="group-data-[collapsible=icon]:hidden">
    <SidebarGroupLabel>Main</SidebarGroupLabel>
    <SidebarMenu>
      <SidebarMenuItem v-for="item in projects" :key="item.name">
        <SidebarMenuButton @click="handleItemClick(item)">
          <component :is="item.icon" />
          <span>{{ item.name }}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>

  <!-- Workspace Dialog -->
  <WorkspaceDialog v-if="activeDialog === 'workspace'" v-model:open="isDialogOpen" />
  <BoardDialog v-if="activeDialog === 'board'" v-model:open="isDialogOpen" />
</template>
