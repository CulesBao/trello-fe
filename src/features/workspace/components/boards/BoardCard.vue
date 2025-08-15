<script setup lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

  type BoardItem = { id: number; name: string; description?: string }

  defineProps<Props>()
  interface Props {
    board: BoardItem
  }
  defineOptions({ name: 'BoardCard' })
  const router = useRouter()
  const onBoardClick = (id: number, name: string) => {
    router.push(`/b/${id}/${encodeURIComponent(name)}`)
  }
</script>

<template>
  <Card
    @click="onBoardClick(board.id, board.name)"
    class="cursor-pointer hover:shadow-lg transition-all duration-200 min-h-[140px] border hover:border-primary/50"
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
