<script setup lang="ts">
  import AuthLayout from '@/layouts/auth.vue';
  import DefaultLayout from '@/layouts/default.vue';

  const routes = useRoute()

  const layout = computed(() => {
    return routes.meta.isAuthLayout ? AuthLayout : DefaultLayout;
  });
</script>


<template>
  <component :is="layout">
  </component>
</template>
