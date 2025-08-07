<script setup lang="ts">
import { ref } from 'vue'
import {
  type LucideIcon,
} from 'lucide-vue-next'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

import WorkspaceDialog from '@/components/dialogs/WorkspaceDialog.vue'

defineProps<{
  projects: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}>()

const emit = defineEmits<{
  workspaceCreated: []
}>()

const isDialogOpen = ref(false)

const handleItemClick = (item: { name: string; url: string; icon: LucideIcon }) => {
  if (item.name === 'New workspace') {
    isDialogOpen.value = true
  } else {
    // Navigate to other items
    window.location.href = item.url
  }
}

const handleWorkspaceCreated = () => {
  emit('workspaceCreated')
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
  <WorkspaceDialog
    v-model:open="isDialogOpen"
    @workspace-created="handleWorkspaceCreated"
  />
</template>
