<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Badge from '@/components/ui/badge/Badge.vue'
import type { Board } from '@/api/types/board'

interface Props {
  board: Board
}

interface Emits {
  (e: 'board-click', board: Board): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleBoardClick = () => {
  emit('board-click', props.board)
}
</script>

<template>
  <Card
    class="cursor-pointer hover:shadow-lg transition-all duration-200 min-h-[140px] border hover:border-primary/50"
    @click="handleBoardClick"
  >
    <CardHeader class="pb-3">
      <CardTitle class="text-lg font-semibold">{{ board.title }}</CardTitle>
      <CardDescription class="text-sm line-clamp-2 text-muted-foreground">
        {{ board.description }}
      </CardDescription>
    </CardHeader>
    <CardContent class="pt-0 pb-4">
      <div class="flex items-center justify-between">
        <Badge :variant="board.isPublic ? 'default' : 'secondary'" class="text-xs px-2 py-1">
          {{ board.isPublic ? 'Public' : 'Private' }}
        </Badge>
      </div>
    </CardContent>
  </Card>
</template>
