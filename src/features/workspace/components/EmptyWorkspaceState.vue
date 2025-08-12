<script setup lang="ts">
  import { Grid3x3 } from 'lucide-vue-next'
  defineOptions({ name: 'EmptyWorkspaceState' })
</script>

<template>
  <div class="flex flex-col items-center justify-center py-20 text-center">
    <div class="rounded-xl border border-dashed p-12 bg-muted/20">
      <Grid3x3 class="h-16 w-16 mx-auto text-muted-foreground mb-6" />
      <h3 class="text-xl font-semibold mb-3">No workspaces found</h3>
      <p class="text-muted-foreground mb-6 max-w-md">
        Create your first workspace to get started with organizing your boards and collaborating
        with your team.
      </p>
    </div>
  </div>
</template>
