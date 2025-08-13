<script setup lang="ts">
  import type { SidebarProps } from '@/components/ui/sidebar'

  import { LayoutTemplate, Table2, BadgePlus } from 'lucide-vue-next'
  import AppSideBarHeader from '@/components/layouts/defaults/AppSideBarHeader.vue'
  import AppSideBarContent from '@/components/layouts/defaults/AppSideBarContent.vue'
  import AppSideBarFooter from '@/components/layouts/defaults/AppSideBarFooter.vue'
  import { UserService } from '@/api'

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

  onMounted(async () => {
    await UserService.getMyProfile()
  })

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
      <AppSideBarHeader />
    </SidebarHeader>
    <SidebarContent>
      <AppSideBarContent :nav-main="data.navMain" />
    </SidebarContent>
    <SidebarFooter>
      <AppSideBarFooter />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
