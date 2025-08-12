<script setup lang="ts">
  import WorkspaceSection from './WorkspaceSection.vue'
  import EmptyWorkspaceState from './EmptyWorkspaceState.vue'
  // Board click in this layout only needs id/name/description
  import { useWorkspaceStore } from '@/stores/workspace'
  import BoardDialog from '@/components/dialogs/BoardDialog.vue'
  import { ref } from 'vue'
  defineOptions({ name: 'WorkspaceLayout' })

  const workspaceStore = useWorkspaceStore()

  const createBoardOpen = ref(false)
  const createBoardWorkspaceId = ref<string | number | undefined>(undefined)

  const handleCreateBoard = (workspaceId: string) => {
    createBoardWorkspaceId.value = workspaceId
    createBoardOpen.value = true
  }

  const handleBoardClick = (board: { id: string | number; name: string; description?: string }) => {
    console.log('Navigate to board:', board.id)
    // TODO: Navigate to board detail page
  }
</script>

<template>
  <div class="flex flex-col gap-8 p-8">
    <div class="flex items-center justify-between mb-2">
      <h1 class="text-3xl font-bold">My Workspaces</h1>
    </div>

    <!-- All Workspaces -->
    <div v-if="workspaceStore.workspaces.length > 0" class="space-y-12">
      <WorkspaceSection
        v-for="workspace in workspaceStore.workspaces"
        :key="workspace.id"
        :workspace="workspace"
        @create-board="handleCreateBoard"
        @board-click="handleBoardClick"
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
