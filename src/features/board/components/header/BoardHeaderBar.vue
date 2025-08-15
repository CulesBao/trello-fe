<script setup lang="ts">
  import TrelloLogo from '@/assets/trello_logo.png'
  import Button from '@/components/ui/button/Button.vue'
  import { Bell, Settings } from 'lucide-vue-next'
  import { useNotificationLogStore } from '@/stores/notificationLog'
  import { useRouter } from 'vue-router'

  const emit = defineEmits<{
    (e: 'open-notifications'): void
    (e: 'open-settings'): void
  }>()

  const logStore = useNotificationLogStore()
  const router = useRouter()

  const goHome = () => router.push('/')
</script>

<template>
  <header class="sticky top-0 z-40 w-full border-b border-border/70 bg-background">
    <div class="w-full px-4 md:px-8">
      <div class="h-12 md:h-14 flex items-center justify-between gap-2">
        <div class="flex h-9 items-center gap-2 cursor-pointer select-none" @click="goHome">
          <div
            class="flex aspect-square size-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground shrink-0"
          >
            <img :src="TrelloLogo" alt="Trello" class="size-6" />
          </div>
          <div class="flex items-center text-sm font-semibold text-foreground">
            <span class="truncate">Trello</span>
          </div>
        </div>
        <div class="flex h-9 items-center gap-1.5">
          <Button
            size="icon"
            variant="ghost"
            class="relative text-muted-foreground hover:text-foreground hover:bg-accent/20"
            @click="emit('open-notifications')"
          >
            <Bell class="h-5 w-5" />
            <span class="sr-only">Notifications</span>
            <span
              v-if="logStore.recent.length"
              class="absolute -top-1 -right-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-medium text-white"
              >{{ logStore.recent.length > 99 ? '99+' : logStore.recent.length }}</span
            >
          </Button>
          <Button
            size="icon"
            variant="ghost"
            class="text-muted-foreground hover:text-foreground hover:bg-accent/20"
            @click="emit('open-settings')"
          >
            <Settings class="h-5 w-5" />
            <span class="sr-only">Settings</span>
          </Button>
        </div>
      </div>
    </div>
  </header>
</template>
