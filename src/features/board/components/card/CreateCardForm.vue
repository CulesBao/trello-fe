<script setup lang="ts">
  import Input from '@/components/ui/input/Input.vue'
  import Button from '@/components/ui/button/Button.vue'
  import type { CreateCardRequest } from '@/api/types/card'

  const props = defineProps<{
    listId: string | number
  }>()

  const emit = defineEmits<{
    (e: 'create', payload: CreateCardRequest): void
    (e: 'cancel'): void
  }>()

  const title = ref('')

  const onSubmit = () => {
    if (!title.value.trim()) return
    emit('create', { title: title.value.trim(), listId: String(props.listId), order: 1 })
    title.value = ''
  }
</script>

<template>
  <form class="flex items-center gap-2" @submit.prevent="onSubmit">
    <Input v-model="title" placeholder="Add a card" class="h-9" />
    <Button type="submit" size="sm">Add</Button>
    <Button type="button" size="sm" variant="ghost" @click="emit('cancel')">Cancel</Button>
  </form>
</template>
