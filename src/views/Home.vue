<script setup lang="ts">
import { onMounted } from 'vue'
import AppSidebar from '@/components/layouts/defaults/AppSideBar.vue'
import WorkspaceLayout from '@/components/workspace/WorkspaceLayout.vue'

import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { useWorkspaceStore } from '@/stores/workspace'

defineOptions({ name: 'HomeView' })

const workspaceStore = useWorkspaceStore()


onMounted(async () => {
  await workspaceStore.loadWorkspaces()
})
</script>

<template>
  <SidebarProvider>
  <AppSidebar/>
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 h-4" />
        </div>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <WorkspaceLayout />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
