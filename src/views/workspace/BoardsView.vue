<script setup lang="ts">
  import { onMounted, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { WorkspaceHeaderInfo } from '@/components/workspace'
  import BoardGrid from '@/components/workspace/boards/BoardGrid.vue'
  import { WorkspaceService } from '@/api/services'

  const route = useRoute()

  const workspaceId = computed(() => route.params.id as string)

  const currentWorkspace = ref()

  onMounted(async () => {
    currentWorkspace.value = await WorkspaceService.getWorkspaceById(workspaceId.value)
  })

  const handleBoardClick = (board: { id: number | string; name: string; description?: string }) => {
    console.log('Open board detail', board.id)
  }
</script>

<template>
  <div class="mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-8 flex flex-col gap-6">
    <div class="flex items-center justify-between">
      <WorkspaceHeaderInfo
        :name="currentWorkspace?.name || 'Workspace'"
        :description="currentWorkspace?.description || ''"
      />
    </div>
    <BoardGrid :boards="currentWorkspace?.boards || []" @board-click="handleBoardClick" />
  </div>
</template>
