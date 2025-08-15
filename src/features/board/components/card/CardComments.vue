<script setup lang="ts">
  import { ref } from 'vue'
  import type { Comment } from '@/api/types/card'
  import AvatarInitials from '@/components/ui/avatar/AvatarInitials.vue'

  const props = defineProps<{
    comments: Comment[]
  }>()

  const emit = defineEmits<{ (e: 'create', content: string): void }>()
  const draft = ref('')
  const submit = () => {
    const v = draft.value.trim()
    if (!v) return
    emit('create', v)
    draft.value = ''
  }
</script>

<template>
  <div class="space-y-2">
    <h4 class="text-sm font-medium text-foreground/90">Comments ({{ props.comments.length }})</h4>
    <div v-if="!props.comments.length" class="text-sm text-muted-foreground">No comments yet.</div>
    <ul class="space-y-2">
      <li v-for="c in props.comments" :key="c.id" class="rounded border border-border/60 bg-card p-2">
        <div class="flex items-start gap-2">
          <AvatarInitials :name="c.user?.name || 'U'" class="h-7 w-7" />
          <div class="flex-1 space-y-0.5">
            <div class="flex items-center justify-between">
              <div class="text-sm font-medium">{{ c.user?.name || 'Unknown' }}</div>
              <div class="text-xs text-muted-foreground">{{ new Date(c.createAt).toLocaleString() }}</div>
            </div>
            <div class="text-sm whitespace-pre-wrap">{{ c.content }}</div>
            <div v-if="c.updateAt" class="text-[10px] text-muted-foreground">edited {{ new Date(c.updateAt).toLocaleString() }}</div>
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
      <button type="submit" class="h-9 shrink-0 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:opacity-90">Post</button>
    </form>
  </div>
</template>
