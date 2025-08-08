<script setup lang="ts">
  import { onMounted, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useWorkspaceStore } from '@/stores/workspace'
  import { WorkspaceHeaderInfo } from '@/components/workspace'
  import BoardGrid from '@/components/workspace/BoardGrid.vue'

  const route = useRoute()
  const workspaceStore = useWorkspaceStore()

  const workspaceId = computed(() => route.params.id as string)

  const currentWorkspace = computed(() =>
    workspaceStore.workspaces.find((w) => String(w.id) === workspaceId.value)
  )

  onMounted(async () => {
    if (!workspaceStore.workspaces.length) {
      await workspaceStore.loadWorkspaces()
    }
  })

  const handleBoardClick = (board: { id: number | string; name: string; description?: string }) => {
    console.log('Open board detail', board.id)
  }
</script>

<template>
  <div class="flex flex-col gap-6 p-6">
    <div class="flex items-center justify-between">
      <WorkspaceHeaderInfo
        :name="currentWorkspace?.name || 'Workspace'"
        :description="currentWorkspace?.description || ''"
      />
    </div>

    <BoardGrid :boards="currentWorkspace?.boards || []" @board-click="handleBoardClick" />
  </div>
</template>
