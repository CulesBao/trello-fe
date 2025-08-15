<script setup lang="ts">
  import Input from '@/components/ui/input/Input.vue'
  import Button from '@/components/ui/button/Button.vue'

  const props = defineProps<{
    boardId: string | number
    loading?: boolean
  }>()

  const emit = defineEmits<{
    (e: 'create', payload: { name: string; boardId: string | number }): void
  }>()

  const name = ref('')

  const onSubmit = () => {
    if (!name.value.trim()) return
    emit('create', { name: name.value.trim(), boardId: props.boardId })
    name.value = ''
  }
</script>

<template>
  <form class="flex items-center gap-2" @submit.prevent="onSubmit">
    <Input v-model="name" placeholder="Add list" class="h-9" />
    <Button type="submit" size="sm" :disabled="props.loading">Add</Button>
  </form>
</template>
