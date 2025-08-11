<script setup lang="ts">
  import type { SidebarProps } from '@/components/ui/sidebar'

  import { LayoutTemplate, Table2, BadgePlus } from 'lucide-vue-next'
  import NavWorkspace from '@/components/layouts/defaults/NavWorkspace.vue'
  import NavMain from '@/components/layouts/defaults/NavMain.vue'
  import NavUser from '@/components/layouts/defaults/NavUser.vue'
  import TeamSwitcher from '@/components/layouts/defaults/TeamSwitcher.vue'
  import { UserService } from '@/api'
  import { useUserStore } from '@/stores/user'
  import { Bell } from 'lucide-vue-next'
  import NotificationSheet from '@/components/notifications/NotificationSheet.vue'
  import Button from '@/components/ui/button/Button.vue'
  import { useNotificationLogStore } from '@/stores/notificationLog'

  import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
  } from '@/components/ui/sidebar'

  const props = withDefaults(defineProps<SidebarProps>(), {
    collapsible: 'icon',
  })

  const userStore = useUserStore()
  const logStore = useNotificationLogStore()
  const open = ref(false)
  onMounted(async () => {
    await UserService.getMyProfile()
  })

  // This is sample data.
  const data = {
    navMain: [
      {
        name: 'Table',
        url: '/',
        icon: Table2,
      },
      {
        name: 'Template',
        url: '#',
        icon: LayoutTemplate,
      },
      {
        name: 'New workspace',
        url: '#',
        icon: BadgePlus,
        isDialog: true,
      },
      {
        name: 'New Board',
        url: '#',
        icon: BadgePlus,
        isDialog: true,
      },
    ],
  }
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <TeamSwitcher />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :projects="data.navMain" />
      <NavWorkspace />
    </SidebarContent>
    <SidebarFooter>
      <div class="flex w-full items-center gap-2 px-2">
        <Button size="icon" variant="ghost" class="relative" @click="open = true">
          <Bell class="h-5 w-5" />
          <span
            v-if="logStore.recent.length"
            class="absolute -top-1 -right-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-medium text-white"
          >{{ logStore.recent.length > 99 ? '99+' : logStore.recent.length }}</span>
        </Button>
        <NavUser
          :user="{
            name: userStore.user?.name || 'Anonymous',
            email: userStore.user?.email || 'No Email',
          }"
        />
      </div>
  <NotificationSheet v-model:open="open" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
