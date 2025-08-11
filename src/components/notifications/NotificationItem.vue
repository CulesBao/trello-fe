<script setup lang="ts">
import type { NotificationLogItem } from '@/stores/notificationLog'

const props = defineProps<{ item: NotificationLogItem }>()
</script>

<template>
  <div
    class="rounded-md border p-3 text-sm leading-snug bg-muted/40 flex flex-col gap-1"
  >
    <div class="flex items-center justify-between gap-2">
      <span class="font-medium text-xs uppercase tracking-wide text-primary/80">{{ props.item.action || 'activity' }}</span>
      <span class="text-[10px] text-muted-foreground">{{ new Date(props.item.createdAt).toLocaleString() }}</span>
    </div>
    <div class="text-foreground/90 whitespace-pre-line">{{ props.item.message }}</div>
  </div>
</template>
