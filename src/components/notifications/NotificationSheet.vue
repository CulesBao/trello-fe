<script setup lang="ts">
  import { Sheet, SheetContent } from '@/components/ui/sheet'
  import SheetHeader from '@/components/ui/sheet/SheetHeader.vue'
  import SheetTitle from '@/components/ui/sheet/SheetTitle.vue'
  import SheetDescription from '@/components/ui/sheet/SheetDescription.vue'
  import Button from '@/components/ui/button/Button.vue'
  import NotificationItem from '@/components/notifications/NotificationItem.vue'
  import { useNotificationLogStore } from '@/stores/notificationLog'

  const props = defineProps<{ open: boolean }>()
  const emit = defineEmits<{ (e: 'update:open', value: boolean): void }>()

  const logStore = useNotificationLogStore()
  const close = () => emit('update:open', false)
</script>

<template>
  <Sheet :open="props.open" @update:open="(val) => emit('update:open', val)">
    <SheetContent side="right" class="w-[380px] sm:w-[420px] p-0 flex flex-col">
      <SheetHeader class="border-b">
        <SheetTitle>Notifications</SheetTitle>
        <SheetDescription>Recent activities</SheetDescription>
      </SheetHeader>
      <div class="flex-1 overflow-y-auto p-4 space-y-3">
        <template v-if="logStore.recent.length">
          <NotificationItem v-for="n in logStore.recent" :key="n.id" :item="n" />
        </template>
        <div v-else class="text-sm text-muted-foreground italic">No notifications.</div>
      </div>
      <div class="border-t p-3 flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          @click="logStore.clear()"
          :disabled="!logStore.recent.length"
          class="text-sm font-semibold text-foreground"
          >Clear</Button
        >
        <Button size="sm" @click="close">Close</Button>
      </div>
    </SheetContent>
  </Sheet>
</template>
