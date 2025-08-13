<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { PanelLeft } from 'lucide-vue-next'
  import { cn } from '@/lib/utils'
  import { Button } from '@/components/ui/button'
  import { useSidebar } from './utils'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()

  const { toggleSidebar } = useSidebar()
</script>

<template>
  <Button
    data-sidebar="trigger"
    data-slot="sidebar-trigger"
    variant="ghost"
    size="icon"
    :class="
      cn(
        'h-7 w-7 bg-transparent text-muted-foreground hover:text-foreground hover:bg-accent/20 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        props.class
      )
    "
    @click="toggleSidebar"
  >
    <PanelLeft />
    <span class="sr-only">Toggle Sidebar</span>
  </Button>
</template>
