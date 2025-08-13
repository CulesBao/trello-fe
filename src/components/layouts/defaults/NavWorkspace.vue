<script setup lang="ts">
  import { ChevronRight } from 'lucide-vue-next'
  import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
  import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
  } from '@/components/ui/sidebar'
  import { useWorkspaceStore } from '@/stores/workspace'
  import type { Workspace } from '@/api'
  import AvatarInitials from '@/components/ui/avatar/AvatarInitials.vue'

  interface ProjectItem {
    id: string
    title: string
    isActive: boolean
    items: {
      title: string
      url: string
    }[]
  }
  const items: Ref<ProjectItem[]> = ref([])
  const workspaceStore = useWorkspaceStore()
  watchEffect(() => {
    const list = workspaceStore.workspaces
    items.value = (list ?? []).map((workspace: Workspace) => ({
      id: workspace.id,
      title: workspace.name,
      isActive: false,
      items: [
        { title: 'Boards', url: `/w/${workspace.id}/boards` },
        { title: 'Members', url: `/w/${workspace.id}/members` },
        { title: 'Settings', url: `/w/${workspace.id}/settings` },
      ],
    }))
  })
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
    <SidebarMenu>
      <Collapsible
        v-for="item in items"
        :key="item.title"
        as-child
        :default-open="item.isActive"
        class="group/collapsible"
      >
        <SidebarMenuItem>
          <CollapsibleTrigger as-child>
            <SidebarMenuButton :tooltip="item.title">
              <AvatarInitials
                :name="item.title"
                class="size-8 rounded-lg shrink-0 group-data-[collapsible=icon]:size-6"
              />
              <span>{{ item.title }}</span>
              <ChevronRight
                class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
              />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              <SidebarMenuSubItem v-for="subItem in item.items" :key="subItem.title">
                <SidebarMenuSubButton as-child>
                  <a :href="subItem.url">
                    <span>{{ subItem.title }}</span>
                  </a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  </SidebarGroup>
</template>
