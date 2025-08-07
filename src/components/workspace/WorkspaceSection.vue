<script setup lang="ts">
import WorkspaceHeader from './WorkspaceHeader.vue'
import BoardGrid from './BoardGrid.vue'
import type { Workspace } from '@/api/types/workspace'
import type { Board } from '@/api/types/board'

interface Props {
  workspace: Workspace
  boards: Board[]
}

interface Emits {
  (e: 'navigate-to-boards', workspaceId: string): void
  (e: 'navigate-to-members', workspaceId: string): void
  (e: 'navigate-to-settings', workspaceId: string): void
  (e: 'create-board', workspaceId: string): void
  (e: 'board-click', board: Board): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleNavigateToBoards = (workspaceId: string) => {
  emit('navigate-to-boards', workspaceId)
}

const handleNavigateToMembers = (workspaceId: string) => {
  emit('navigate-to-members', workspaceId)
}

const handleNavigateToSettings = (workspaceId: string) => {
  emit('navigate-to-settings', workspaceId)
}

const handleCreateBoard = () => {
  emit('create-board', props.workspace.id)
}

const handleBoardClick = (board: Board) => {
  emit('board-click', board)
}
</script>

<template>
  <div class="space-y-6">
    <!-- Workspace Header -->
    <WorkspaceHeader
      :workspace="props.workspace"
      @navigate-to-boards="handleNavigateToBoards"
      @navigate-to-members="handleNavigateToMembers"
      @navigate-to-settings="handleNavigateToSettings"
    />

    <!-- Workspace Boards -->
    <BoardGrid
      :boards="props.boards"
      @create-board="handleCreateBoard"
      @board-click="handleBoardClick"
    />
  </div>
</template>
