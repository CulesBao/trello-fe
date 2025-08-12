<script setup lang="ts">
  import { Plus } from 'lucide-vue-next'
  import { Card, CardContent } from '@/components/ui/card'
  import BoardDialog from '@/components/dialogs/BoardDialog.vue'
  defineOptions({ name: 'CreateBoardCard' })

  const isDialogOpen = ref(false)

  const handleCreateBoard = () => {
    console.log('Creating board...')
    isDialogOpen.value = true
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
  <BoardDialog v-model:open="isDialogOpen" />
</template>
