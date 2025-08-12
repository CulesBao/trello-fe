<script setup lang="ts">
  import { Users, Settings, Grid3x3 } from 'lucide-vue-next'
  import { Button } from '@/components/ui/button'
  import type { Workspace } from '@/api/types/workspace'
  import { Avatar, AvatarFallback } from '@/components/ui/avatar'
  import { getShortName } from '@/utils/shortName'
  import { RouterLink } from 'vue-router'
  defineOptions({ name: 'WorkspaceHeader' })

  interface Props {
    workspace: Workspace
    showActions?: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
    showActions: true,
  })
</script>

<template>
  <div class="flex items-center justify-between bg-muted/30 rounded-lg p-6">
    <div class="group flex items-center gap-5 min-w-0">
      <Avatar class="h-14 w-14 ring-2 ring-background shadow-sm shadow-black/5 overflow-hidden">
        <AvatarFallback
          :class="[
            'text-sm font-medium tracking-wide text-white flex items-center justify-center select-none',
          ]"
        >
          {{ getShortName(props.workspace.name) }}
        </AvatarFallback>
      </Avatar>
      <div class="flex flex-col min-w-0">
        <div class="flex items-center gap-3">
          <h2
            class="text-xl font-semibold text-foreground tracking-tight truncate max-w-[28ch]"
            :title="props.workspace.name"
          >
            {{ props.workspace.name }}
          </h2>
        </div>
        <p
          class="mt-1 line-clamp-2 text-sm leading-snug text-muted-foreground/90 max-w-prose [text-wrap:pretty]"
        >
          {{ props.workspace.description || 'Workspace boards and settings' }}
        </p>
      </div>
    </div>
    <div v-if="props.showActions" class="flex items-center gap-3">
      <div class="flex items-center gap-3">
        <Button variant="outline" class="flex items-center gap-2 px-4 py-2" as-child>
          <RouterLink :to="`/w/${props.workspace.id}/boards`">
            <Grid3x3 class="h-4 w-4" />
            Boards
          </RouterLink>
        </Button>
        <Button variant="outline" class="flex items-center gap-2 px-4 py-2" as-child>
          <RouterLink :to="`/w/${props.workspace.id}/members`">
            <Users class="h-4 w-4" />
            Members
          </RouterLink>
        </Button>
        <Button variant="outline" class="flex items-center gap-2 px-4 py-2" as-child>
          <RouterLink :to="`/w/${props.workspace.id}/settings`">
            <Settings class="h-4 w-4" />
            Settings
          </RouterLink>
        </Button>
      </div>
    </div>
  </div>
</template>
