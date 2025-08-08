<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type BoardItem = { id: number | string; name: string; description?: string }

interface Props {
  board: BoardItem
}

interface Emits {
  (e: 'board-click', board: BoardItem): void
}

defineOptions({ name: 'BoardCard' })

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
  <CardTitle class="text-lg font-semibold">{{ board.name }}</CardTitle>
      <CardDescription class="text-sm line-clamp-2 text-muted-foreground">
        {{ board.description }}
      </CardDescription>
    </CardHeader>
    <CardContent class="pt-0 pb-4">
      <!-- extra board meta could go here -->
    </CardContent>
  </Card>
</template>
