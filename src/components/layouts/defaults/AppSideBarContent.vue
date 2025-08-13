<script setup lang="ts">
  import NavWorkspace from '@/components/layouts/defaults/NavWorkspace.vue'
  import NavMain from '@/components/layouts/defaults/NavMain.vue'

  import { type LucideIcon } from 'lucide-vue-next'

  interface NavItem {
    name: string
    url: string
    icon: LucideIcon
    isDialog?: boolean
  }

  defineProps<{ navMain: NavItem[] }>()
</script>

<template>
  <NavMain :projects="navMain" />
  <NavWorkspace />
</template>
