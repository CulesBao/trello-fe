<script setup lang="ts">
  import { Users, Settings, Grid3x3 } from 'lucide-vue-next'
  import { Button } from '@/components/ui/button'
  import type { Workspace } from '@/api/types/workspace'
  import { RouterLink } from 'vue-router'
  import { computed, type Component } from 'vue'
  import AvatarInitials from '@/components/ui/avatar/AvatarInitials.vue'
  defineOptions({ name: 'WorkspaceHeader' })

  interface Props {
    workspace: Workspace
    showActions?: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
    showActions: true,
  })

  const actions = computed<{ label: string; to: string; icon: Component }[]>(() => [
    { label: 'Boards', to: `/w/${props.workspace.id}/boards`, icon: Grid3x3 },
    { label: 'Members', to: `/w/${props.workspace.id}/members`, icon: Users },
    { label: 'Settings', to: `/w/${props.workspace.id}/settings`, icon: Settings },
  ])
</script>

<template>
  <div
    class="flex items-center justify-between bg-card/60 text-card-foreground border border-border/70 rounded-lg p-6 shadow-sm"
  >
    <div class="group flex items-center gap-5 min-w-0">
      <AvatarInitials
        :name="props.workspace.name"
        class="h-14 w-14 ring-1 ring-border shadow-sm shadow-black/5 overflow-hidden"
      />
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
        <Button
          v-for="item in actions"
          :key="item.to"
          variant="outline"
          class="flex items-center gap-2 px-4 py-2 border-border/60 text-muted-foreground bg-transparent hover:bg-accent/20 hover:text-foreground"
          as-child
        >
          <RouterLink :to="item.to">
            <component :is="item.icon" class="h-4 w-4" />
            {{ item.label }}
          </RouterLink>
        </Button>
      </div>
    </div>
  </div>
</template>
