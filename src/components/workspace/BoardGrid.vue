<script setup lang="ts">
import CreateBoardCard from './CreateBoardCard.vue'
import BoardCard from './BoardCard.vue'

type BoardItem = { id: number | string; name: string; description?: string }

interface Props {
  boards: BoardItem[]
}

interface Emits {
  (e: 'create-board'): void
  (e: 'board-click', board: BoardItem): void
}

defineOptions({ name: 'BoardGrid' })

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleCreateBoard = () => {
  emit('create-board')
}

const handleBoardClick = (board: BoardItem) => {
  emit('board-click', board)
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-2">
    <!-- Existing Boards -->
    <BoardCard
    v-for="board in boards"
    :key="board.id"
    :board="board"
    @board-click="handleBoardClick"
    />
    <!-- Create New Board Card -->
    <CreateBoardCard @create-board="handleCreateBoard" />
  </div>
</template>
