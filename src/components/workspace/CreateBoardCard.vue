<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import { Card, CardContent } from '@/components/ui/card'
defineOptions({ name: 'CreateBoardCard' })

interface Emits {
  (e: 'create-board'): void
}

const emit = defineEmits<Emits>()

const handleCreateBoard = () => {
  emit('create-board')
}
</script>

<template>
  <Card
    class="cursor-pointer border-dashed border-2 hover:border-primary transition-all duration-200 min-h-[140px] flex items-center justify-center hover:shadow-lg"
    @click="handleCreateBoard"
  >
    <CardContent class="flex flex-col items-center justify-center p-8 text-center">
      <Plus class="h-10 w-10 text-muted-foreground mb-3" />
      <p class="text-sm font-medium text-muted-foreground">Create new board</p>
    </CardContent>
  </Card>
</template>
