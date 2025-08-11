<script setup lang="ts">
  import AuthLayout from '@/layouts/auth.vue'
  import DefaultLayout from '@/layouts/default.vue'
  import ErrorBounder from '@/components/ErrorBounder.vue'
  import { useSseNotifications } from '@/composables/useSseNotifications'

  const routes = useRoute()

  const layout = computed(() => {
    return routes.meta.isAuthLayout ? AuthLayout : DefaultLayout
  })

  useSseNotifications()
</script>

<template>
  <ErrorBounder>
    <component :is="layout">
      <router-view />
    </component>
  </ErrorBounder>
</template>
