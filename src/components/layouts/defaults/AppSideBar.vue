<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'

import {
  LayoutTemplate,
  Table2,
  BadgePlus,
} from 'lucide-vue-next'
import NavWorkspace from '@/components/layouts/defaults/NavWorkspace.vue'
import NavMain from '@/components/layouts/defaults/NavMain.vue'
import NavUser from '@/components/layouts/defaults/NavUser.vue'
import TeamSwitcher from '@/components/layouts/defaults/TeamSwitcher.vue'
import { UserService, type Workspace } from '@/api';
import { useUserStore } from '@/stores/user';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { getShortName } from '@/utils/shortName'

interface ProjectItem {
  id: string
  title: string
  url: string
  isActive: boolean
  shortName: string
  items: {
    title: string
    url: string
  }[]
}

interface AppSidebarProps extends SidebarProps {
  workspaces: Workspace[]
}

const props = withDefaults(defineProps<AppSidebarProps>(), {
  collapsible: 'icon',
  workspaces: () => []
})

const emit = defineEmits<{
  workspaceCreated: []
}>()

const projects: Ref<ProjectItem[]> = ref([])

const userStore = useUserStore()
onMounted(async() => {
  await UserService.getMyProfile()
})

// Watch for workspaces prop changes and update projects
watchEffect(() => {
  if (props.workspaces && props.workspaces.length > 0) {
    projects.value = props.workspaces.map((workspace: Workspace) => {
      return {
        id: workspace.id,
        title: workspace.name,
        url: `workspace/${workspace.id}`,
        shortName: getShortName(workspace.name),
        isActive: false,
        items: [{
          title: 'Boards',
          url: '#'
        },
        {
          title: 'Members',
          url: '#'
        },
        {
          title: 'Settings',
          url: '#'
        }]
      }
    })
  }
})
// This is sample data.
const data = {
  navMain: [
    {
      name: 'Table',
      url: '#',
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
    }
  ],
}
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <TeamSwitcher />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :projects="data.navMain" @workspace-created="emit('workspaceCreated')" />
      <NavWorkspace :items="projects" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="{ name: userStore.user?.name || 'Anonymous', email: userStore.user?.email || 'No Email', avatar: userStore.getShortName() }" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
