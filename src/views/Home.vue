<script lang="ts">
export const description = 'A sidebar that collapses to icons.'
export const iframeHeight = '800px'
export const containerClass = 'w-full h-full'
</script>

<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'
import AppSidebar from '@/components/layouts/defaults/AppSideBar.vue'
import WorkspaceLayout from '@/components/workspace/WorkspaceLayout.vue'

import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { WorkspaceService } from '@/api/services'
import { type Workspace } from '@/api/types/workspace'

const myWorkspace : Ref<Workspace[]> = ref([])

const loadWorkspaces = async () => {
  myWorkspace.value = await WorkspaceService.getWorkspaces()
}

const handleWorkspaceCreated = () => {
  loadWorkspaces()
}

onMounted(async () => {
  await loadWorkspaces()
})
</script>

<template>
  <SidebarProvider>
    <AppSidebar :workspaces="myWorkspace" @workspace-created="handleWorkspaceCreated" />
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 h-4" />
        </div>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <WorkspaceLayout :workspaces="myWorkspace" />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
