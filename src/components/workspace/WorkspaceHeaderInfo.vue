<script setup lang="ts">
  import { getShortName } from '@/utils/shortName'
  import { Avatar, AvatarFallback } from '@/components/ui/avatar'

  defineOptions({ name: 'WorkspaceHeaderInfo' })

  defineProps<{
    name: string
    description?: string
  }>()
</script>

<template>
  <div class="flex items-center space-x-4">
    <Avatar class="h-10 w-10">
      <AvatarFallback>{{ getShortName(name) }}</AvatarFallback>
    </Avatar>
    <div class="space-y-2">
      <h2 class="text-2xl font-semibold text-foreground">{{ name }}</h2>
      <p class="text-sm text-muted-foreground mt-1">
        {{ description || 'Workspace boards and settings' }}
      </p>
    </div>
  </div>
</template>
