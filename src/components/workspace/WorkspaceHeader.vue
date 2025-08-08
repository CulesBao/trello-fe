<script setup lang="ts">
  import { Users, Settings, Grid3x3 } from 'lucide-vue-next'
  import { Button } from '@/components/ui/button'
  import type { Workspace } from '@/api/types/workspace'
  defineOptions({ name: 'WorkspaceHeader' })

  interface Props {
    workspace: Workspace
  }
  defineProps<Props>()
</script>

<template>
  <div class="flex items-center justify-between bg-muted/30 rounded-lg p-6">
    <div class="flex items-center gap-3">
      <div>
        <h2 class="text-2xl font-semibold text-foreground">{{ workspace.name }}</h2>
        <p class="text-sm text-muted-foreground mt-1">
          {{ workspace.description || 'Workspace boards and settings' }}
        </p>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <div class="flex items-center gap-3">
        <Button variant="outline" class="flex items-center gap-2 px-4 py-2">
          <Grid3x3 class="h-4 w-4" />
          <a :href="`/workspace/${workspace.id}/boards`"> Boards </a>
        </Button>
        <Button variant="outline" class="flex items-center gap-2 px-4 py-2">
          <Users class="h-4 w-4" />
          Members
        </Button>
        <Button variant="outline" class="flex items-center gap-2 px-4 py-2">
          <Settings class="h-4 w-4" />
          Settings
        </Button>
      </div>
    </div>
  </div>
</template>
