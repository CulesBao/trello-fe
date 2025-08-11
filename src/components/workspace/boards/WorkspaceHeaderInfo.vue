<script setup lang="ts">
  import { getShortName } from '@/utils/shortName'
  import { Avatar, AvatarFallback } from '@/components/ui/avatar'

  defineOptions({ name: 'WorkspaceHeaderInfo' })

  const props = defineProps<{
    name: string
    description?: string
  }>()
</script>

<template>
  <div class="group flex items-center gap-5">
    <Avatar
      class="h-14 w-14 ring-2 ring-background shadow-sm shadow-black/5 dark:ring-neutral-900 overflow-hidden"
    >
      <AvatarFallback
        :class="[
          'text-sm font-medium tracking-wide text-white flex items-center justify-center select-none',
        ]"
      >
        {{ getShortName(props.name) }}
      </AvatarFallback>
    </Avatar>
    <div class="flex flex-col min-w-0">
      <div class="flex items-center gap-3">
        <h2
          class="text-xl font-semibold text-foreground tracking-tight truncate max-w-[28ch]"
          :title="props.name"
        >
          {{ props.name }}
        </h2>
      </div>
      <p
        class="mt-1 line-clamp-2 text-sm leading-snug text-muted-foreground/90 max-w-prose [text-wrap:pretty]"
      >
        {{ props.description || 'Workspace boards and settings' }}
      </p>
    </div>
  </div>
</template>
