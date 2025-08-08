<script setup lang="ts">
  import WorkspaceHeader from './WorkspaceHeader.vue'
  import BoardGrid from './BoardGrid.vue'
  import type { Workspace } from '@/api/types/workspace'
  defineOptions({ name: 'WorkspaceSection' })

  interface Props {
    workspace: Workspace
  }
  const props = defineProps<Props>()
</script>

<template>
  <div class="space-y-6">
    <WorkspaceHeader :workspace="props.workspace" />

    <BoardGrid :boards="workspace.boards" />
  </div>
</template>
