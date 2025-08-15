<script setup lang="ts">
  import { computed, ref } from 'vue'
  import type { CheckList } from '@/api/types/card'
  import Input from '@/components/ui/input/Input.vue'
  import Button from '@/components/ui/button/Button.vue'

  const props = defineProps<{
    items: CheckList[]
  }>()

  const emit = defineEmits<{ (e: 'create', content: string): void }>()

  const completed = computed(() => props.items.filter((i) => i.isDone).length)
  const percent = computed(() => (props.items.length ? Math.round((completed.value / props.items.length) * 100) : 0))

  const draft = ref('')
  const submit = () => {
    const v = draft.value.trim()
    if (!v) return
    emit('create', v)
    draft.value = ''
  }
</script>

<template>
  <div class="space-y-3">
    <div class="flex items-center justify-between">
      <h4 class="text-sm font-medium text-foreground/90">Checklist</h4>
      <span class="text-xs text-muted-foreground">{{ completed }}/{{ props.items.length }} • {{ percent }}%</span>
    </div>
    <div class="h-1.5 w-full rounded bg-muted overflow-hidden">
      <div class="h-full bg-primary transition-all" :style="{ width: percent + '%' }" />
    </div>

    <div v-if="!props.items.length" class="text-sm text-muted-foreground">No checklist items.</div>
    <ul class="space-y-1">
      <li
        v-for="i in props.items"
        :key="i.id"
        class="flex items-start gap-2 rounded border border-border/60 bg-card p-2"
        :class="i.isDone ? 'opacity-80' : ''"
      >
        <input type="checkbox" :checked="i.isDone" disabled class="mt-0.5" />
        <span class="text-sm" :class="i.isDone ? 'line-through text-muted-foreground' : ''">{{ i.content }}</span>
      </li>
    </ul>

    <form class="mt-2 flex items-center gap-2" @submit.prevent="submit">
      <Input v-model="draft" placeholder="Add checklist item" class="h-9" />
      <Button type="submit" size="sm">Add</Button>
    </form>
  </div>
</template>
