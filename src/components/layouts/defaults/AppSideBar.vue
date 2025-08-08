<script setup lang="ts">
  import type { SidebarProps } from '@/components/ui/sidebar'

  import { LayoutTemplate, Table2, BadgePlus } from 'lucide-vue-next'
  import NavWorkspace from '@/components/layouts/defaults/NavWorkspace.vue'
  import NavMain from '@/components/layouts/defaults/NavMain.vue'
  import NavUser from '@/components/layouts/defaults/NavUser.vue'
  import TeamSwitcher from '@/components/layouts/defaults/TeamSwitcher.vue'
  import { UserService } from '@/api'
  import { useUserStore } from '@/stores/user'

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
      <NavUser
        :user="{
          name: userStore.user?.name || 'Anonymous',
          email: userStore.user?.email || 'No Email',
          avatar: userStore.getShortName(),
        }"
      />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
