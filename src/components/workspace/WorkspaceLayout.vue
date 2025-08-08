<script setup lang="ts">
import WorkspaceSection from './WorkspaceSection.vue'
import EmptyWorkspaceState from './EmptyWorkspaceState.vue'
// Board click in this layout only needs id/name/description
import { useWorkspaceStore } from '@/stores/workspace'
import BoardDialog from '@/components/dialogs/BoardDialog.vue'
import { ref } from 'vue'
defineOptions({ name: 'WorkspaceLayout' })

const workspaceStore = useWorkspaceStore()
// Event handlers
const handleNavigateToBoards = (workspaceId: string) => {
  console.log('Navigate to boards for workspace:', workspaceId)
  // TODO: Navigate to boards page
}

const handleNavigateToMembers = (workspaceId: string) => {
  console.log('Navigate to members for workspace:', workspaceId)
  // TODO: Navigate to members page
}

const handleNavigateToSettings = (workspaceId: string) => {
  console.log('Navigate to settings for workspace:', workspaceId)
  // TODO: Navigate to settings page
}

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

const handleCreateWorkspace = () => {
  console.log('Create new workspace')
  // TODO: Implement create workspace logic
}
</script>

<template>
  <div class="flex flex-col gap-8 p-8">
    <div class="flex items-center justify-between mb-2">
      <h1 class="text-3xl font-bold tracking-tight">My Workspaces</h1>
    </div>

  <!-- All Workspaces -->
  <div v-if="workspaceStore.workspaces.length > 0" class="space-y-12">
      <WorkspaceSection
    v-for="workspace in workspaceStore.workspaces"
        :key="workspace.id"
        :workspace="workspace"
        @navigate-to-boards="handleNavigateToBoards"
        @navigate-to-members="handleNavigateToMembers"
        @navigate-to-settings="handleNavigateToSettings"
        @create-board="handleCreateBoard"
        @board-click="handleBoardClick"
      />
    </div>

    <!-- Empty State -->
    <EmptyWorkspaceState
      v-else
      @create-workspace="handleCreateWorkspace"
    />

    <!-- Board Create Dialog -->
    <BoardDialog
      v-model:open="createBoardOpen"
      :workspace-id="createBoardWorkspaceId as any"
      @board-created="workspaceStore.reload()"
    />
  </div>
</template>
