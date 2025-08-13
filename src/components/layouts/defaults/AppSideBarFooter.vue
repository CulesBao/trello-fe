<script setup lang="ts">
  import { Bell } from 'lucide-vue-next'
  import NotificationSheet from '@/components/notifications/NotificationSheet.vue'
  import Button from '@/components/ui/button/Button.vue'
  import NavUser from '@/components/layouts/defaults/NavUser.vue'
  import { AvatarInitials } from '@/components/ui/avatar'
  import { useNotificationLogStore } from '@/stores/notificationLog'
  import { useUserStore } from '@/stores/user'
  import { useSidebar } from '@/components/ui/sidebar'

  const logStore = useNotificationLogStore()
  const userStore = useUserStore()
  const open = ref(false)
  const { state } = useSidebar()
</script>

<template>
  <div
    class="flex w-full items-center gap-2 px-2 group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:items-center"
  >
    <Button size="icon" variant="ghost" class="relative" @click="open = true">
      <Bell :class="state === 'collapsed' ? 'h-6 w-6' : 'h-5 w-5'" />
      <span
        v-if="logStore.recent.length"
        class="absolute -top-1 -right-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-medium text-white"
        >{{ logStore.recent.length > 99 ? '99+' : logStore.recent.length }}</span
      >
    </Button>
    <template v-if="state !== 'collapsed'">
      <NavUser
        :user="{
          name: userStore.user?.name || 'Anonymous',
          email: userStore.user?.email || 'No Email',
        }"
      />
    </template>
    <template v-else>
      <AvatarInitials :name="userStore.user?.name || 'Anonymous'" class="h-7 w-7 rounded-lg" />
    </template>
  </div>
  <NotificationSheet v-model:open="open" />
</template>
