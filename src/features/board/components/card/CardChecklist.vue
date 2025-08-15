<script setup lang="ts">
  import { computed, ref } from 'vue'
  import type { CheckList } from '@/api/types/card'
  import Input from '@/components/ui/input/Input.vue'
  import Button from '@/components/ui/button/Button.vue'
  import { CheckListService } from '@/api/services/checkList.service'

  const props = defineProps<{
    items: CheckList[]
    cardId: number
  }>()

  const emit = defineEmits<{ (e: 'changed'): void }>()

  const completed = computed(() => props.items.filter((i) => i.isDone).length)
  const percent = computed(() =>
    props.items.length ? Math.round((completed.value / props.items.length) * 100) : 0
  )

  const draft = ref('')
  const creating = ref(false)
  const editingId = ref<number | null>(null)
  const editDraft = ref('')
  const pendingId = ref<number | null>(null)

  const startEdit = (item: CheckList) => {
    editingId.value = item.id
    editDraft.value = item.content
  }
  const cancelEdit = () => {
    editingId.value = null
    editDraft.value = ''
  }
  const saveEdit = async (item: CheckList) => {
    if (!editDraft.value.trim()) return
    try {
      pendingId.value = item.id
      await CheckListService.updateCheckList(item.id, {
        isDone: item.isDone,
        content: editDraft.value.trim(),
      })
      emit('changed')
      cancelEdit()
    } finally {
      pendingId.value = null
    }
  }

  const toggleDone = async (item: CheckList) => {
    try {
      pendingId.value = item.id
      await CheckListService.updateCheckList(item.id, {
        isDone: !item.isDone,
        content: item.content,
      })
      emit('changed')
    } finally {
      pendingId.value = null
    }
  }

  const removeItem = async (item: CheckList) => {
    const ok = window.confirm('Delete this checklist item?')
    if (!ok) return
    try {
      pendingId.value = item.id
      await CheckListService.deleteCheckList(item.id)
      emit('changed')
    } finally {
      pendingId.value = null
    }
  }

  const submit = async () => {
    const v = draft.value.trim()
    if (!v || creating.value) return
    try {
      creating.value = true
      await CheckListService.createCheckList({
        isDone: false,
        content: v,
        cardId: props.cardId,
      })
      draft.value = ''
      emit('changed')
    } finally {
      creating.value = false
    }
  }
</script>

<template>
  <div class="space-y-3 gap-3 flex flex-col">
    <div class="flex items-center justify-between">
      <h4 class="text-sm font-medium text-foreground/90">Checklist</h4>
      <span class="text-xs text-muted-foreground"
        >{{ completed }}/{{ props.items.length }} • {{ percent }}%</span
      >
    </div>
    <div class="h-1.5 w-full rounded bg-muted overflow-hidden">
      <div class="h-full bg-primary transition-all" :style="{ width: percent + '%' }" />
    </div>

    <div v-if="!props.items.length" class="text-sm text-muted-foreground">No checklist items.</div>
    <ul class="space-y-1">
      <li
        v-for="i in props.items"
        :key="i.id"
        class="flex items-center gap-2 rounded border border-border/60 bg-card p-2"
        :class="i.isDone ? 'opacity-80' : ''"
      >
        <input
          type="checkbox"
          :checked="i.isDone"
          :disabled="pendingId === i.id"
          class="mt-0.5"
          @change="toggleDone(i)"
        />
        <div class="flex-1 min-w-0">
          <div v-if="editingId === i.id" class="flex items-center gap-2">
            <Input v-model="editDraft" class="h-8 w-full" />
            <Button size="sm" :disabled="pendingId === i.id" @click="saveEdit(i)">Save</Button>
            <Button size="sm" variant="secondary" :disabled="pendingId === i.id" @click="cancelEdit"
              >Cancel</Button
            >
          </div>
          <span
            v-else
            class="text-sm"
            :class="i.isDone ? 'line-through text-muted-foreground' : ''"
            >{{ i.content }}</span
          >
        </div>
        <div class="flex items-center gap-1">
          <Button
            v-if="editingId !== i.id"
            size="icon"
            variant="ghost"
            class="h-8 w-8"
            :disabled="pendingId === i.id"
            title="Edit"
            @click="startEdit(i)"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="size-4"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
          </Button>
          <Button
            size="icon"
            variant="ghost"
            class="h-8 w-8 text-destructive hover:bg-destructive/10"
            :disabled="pendingId === i.id"
            title="Delete"
            @click="removeItem(i)"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="size-4"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </Button>
        </div>
      </li>
    </ul>

    <form class="mt-2 flex items-center gap-2" @submit.prevent="submit">
      <Input v-model="draft" placeholder="Add checklist item" class="h-9" />
      <Button type="submit" size="sm" :disabled="creating">Add</Button>
    </form>
  </div>
</template>
