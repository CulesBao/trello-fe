<script setup lang="ts">
import { ref } from 'vue'
import WorkspaceSection from './WorkspaceSection.vue'
import EmptyWorkspaceState from './EmptyWorkspaceState.vue'
import type { Workspace } from '@/api/types/workspace'
import type { Board } from '@/api/types/board'

interface Props {
  workspaces: Workspace[]
}

const props = defineProps<Props>()

// Mock boards data - replace with real API call
const mockBoards = ref<Board[]>([])

const getBoardsForWorkspace = (workspaceId: string) => {
  return mockBoards.value.filter(board => board.teamId === workspaceId)
}

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

const handleCreateBoard = (workspaceId: string) => {
  console.log('Create new board in workspace:', workspaceId)
  // TODO: Implement create board logic
}

const handleBoardClick = (board: Board) => {
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
    <div v-if="props.workspaces.length > 0" class="space-y-12">
      <WorkspaceSection
        v-for="workspace in props.workspaces"
        :key="workspace.id"
        :workspace="workspace"
        :boards="getBoardsForWorkspace(workspace.id)"
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
  </div>
</template>
