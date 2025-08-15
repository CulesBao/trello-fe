<script setup lang="ts">
  import { ref } from 'vue'
  import type { Comment } from '@/api/types/card'
  import AvatarInitials from '@/components/ui/avatar/AvatarInitials.vue'
  import Button from '@/components/ui/button/Button.vue'
  import CommentService from '@/api/services/comment.service'

  const props = defineProps<{
    comments: Comment[]
    cardId: number
  }>()

  const emit = defineEmits<{ (e: 'changed'): void }>()
  const draft = ref('')
  const creating = ref(false)
  const editingId = ref<number | null>(null)
  const editDraft = ref('')
  const pendingId = ref<number | null>(null)

  const submit = async () => {
    const v = draft.value.trim()
    if (!v || creating.value) return
    try {
      creating.value = true
      await CommentService.createComment({ content: v, cardId: String(props.cardId) })
      draft.value = ''
      emit('changed')
    } finally {
      creating.value = false
    }
  }

  const startEdit = (c: Comment) => {
    editingId.value = c.id
    editDraft.value = c.content
  }
  const cancelEdit = () => {
    editingId.value = null
    editDraft.value = ''
  }
  const saveEdit = async (c: Comment) => {
    if (!editDraft.value.trim()) return
    try {
      pendingId.value = c.id
      await CommentService.updateComment(String(c.id), { content: editDraft.value.trim() })
      emit('changed')
      cancelEdit()
    } finally {
      pendingId.value = null
    }
  }
  const removeComment = async (c: Comment) => {
    const ok = window.confirm('Delete this comment?')
    if (!ok) return
    try {
      pendingId.value = c.id
      await CommentService.deleteComment(String(c.id))
      emit('changed')
    } finally {
      pendingId.value = null
    }
  }
</script>

<template>
  <div class="space-y-2 flex flex-col gap-3">
    <h4 class="text-sm font-medium text-foreground/90">Comments ({{ props.comments.length }})</h4>
    <div v-if="!props.comments.length" class="text-sm text-muted-foreground">No comments yet.</div>
    <ul class="space-y-2">
      <li
        v-for="c in props.comments"
        :key="c.id"
        class="rounded border border-border/60 bg-card p-2 flex flex-col gap-2"
      >
        <div class="flex gap-2 items-start">
          <AvatarInitials :name="c.user?.name || 'U'" class="h-7 w-7" />
          <div class="flex-1 flex flex-col space-y-0.5 gap-2 min-w-0">
            <div class="flex items-center justify-between">
              <div class="text-sm font-medium truncate">{{ c.user?.name || 'Unknown' }}</div>
              <div class="flex items-center gap-1">
                <Button
                  v-if="editingId !== c.id"
                  size="icon"
                  variant="ghost"
                  class="h-8 w-8"
                  :disabled="pendingId === c.id"
                  title="Edit"
                  @click="startEdit(c)"
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
                  :disabled="pendingId === c.id"
                  title="Delete"
                  @click="removeComment(c)"
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
            </div>
            <div v-if="editingId === c.id" class="space-y-2">
              <textarea
                v-model="editDraft"
                rows="2"
                class="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                placeholder="Edit your comment..."
              />
              <div class="flex items-center gap-2">
                <Button size="sm" :disabled="pendingId === c.id" @click="saveEdit(c)">Save</Button>
                <Button
                  size="sm"
                  variant="secondary"
                  :disabled="pendingId === c.id"
                  @click="cancelEdit"
                >
                  Cancel
                </Button>
              </div>
            </div>
            <div v-else class="text-sm whitespace-pre-wrap break-words">{{ c.content }}</div>
            <div v-if="c.updateAt" class="text-[10px] text-muted-foreground">
              {{ new Date(c.updateAt).toLocaleString() }}
            </div>
          </div>
        </div>
      </li>
    </ul>

    <form class="mt-3 flex items-start gap-2" @submit.prevent="submit">
      <textarea
        v-model="draft"
        rows="2"
        placeholder="Write a comment..."
        class="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
      />
      <Button type="submit" :disabled="creating">Post</Button>
    </form>
  </div>
</template>
