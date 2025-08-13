<script setup lang="ts">
  import { onMounted, computed, ref, type Ref } from 'vue'
  import { useRoute } from 'vue-router'
  import WorkspaceHeader from '@/features/workspace/components/WorkspaceHeader.vue'
  import BoardGrid from '@/features/workspace/components/boards/BoardGrid.vue'
  import { WorkspaceService } from '@/api/services'
  import type { Workspace } from '@/api'

  const route = useRoute()

  const workspaceId = computed(() => route.params.id as string)

  const currentWorkspace: Ref<Workspace | undefined> = ref()

  onMounted(async () => {
    currentWorkspace.value = await WorkspaceService.getWorkspaceById(workspaceId.value)
  })

  const handleBoardClick = (board: { id: number | string; name: string; description?: string }) => {
    console.log('Open board detail', board.id)
  }
</script>

<template>
  <div
    class="flex flex-col mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-8 gap-6 text-foreground/90"
  >
    <WorkspaceHeader v-if="currentWorkspace" :workspace="currentWorkspace" :show-actions="false" />

    <BoardGrid :boards="currentWorkspace?.boards || []" @board-click="handleBoardClick" />
  </div>
</template>
