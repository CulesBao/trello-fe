<script setup lang="ts">
  import WorkspaceSection from './WorkspaceSection.vue'
  import EmptyWorkspaceState from './EmptyWorkspaceState.vue'
  import { useWorkspaceStore } from '@/stores/workspace'
  import BoardDialog from '@/components/dialogs/BoardDialog.vue'
  defineOptions({ name: 'WorkspaceLayout' })

  const workspaceStore = useWorkspaceStore()

  const createBoardOpen = ref(false)
  const createBoardWorkspaceId = ref<string | number | undefined>(undefined)

  const handleCreateBoard = (workspaceId: string) => {
    createBoardWorkspaceId.value = workspaceId
    createBoardOpen.value = true
  }
</script>

<template>
  <div class="flex flex-col gap-8 p-8">
    <div class="flex items-center justify-between mb-2">
      <h1 class="text-3xl font-semibold tracking-tight text-foreground/90">My Workspaces</h1>
    </div>

    <!-- All Workspaces -->
    <div v-if="workspaceStore.workspaces.length > 0" class="flex flex-col gap-12">
      <WorkspaceSection
        v-for="workspace in workspaceStore.workspaces"
        :key="workspace.id"
        :workspace="workspace"
        @create-board="handleCreateBoard"
      />
    </div>

    <!-- Empty State -->
    <EmptyWorkspaceState v-else />

    <!-- Board Create Dialog -->
    <BoardDialog
      v-model:open="createBoardOpen"
      :workspace-id="createBoardWorkspaceId as any"
      @board-created="workspaceStore.reload()"
    />
  </div>
</template>
