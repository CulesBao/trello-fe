<script setup lang="ts">
  import type { Attachment } from '@/api/types/card'
  import AvatarInitials from '@/components/ui/avatar/AvatarInitials.vue'

  const props = defineProps<{
    attachments: Attachment[]
  }>()

  const emit = defineEmits<{ (e: 'upload', file: File): void }>()

  const onFileChange = (e: Event) => {
    const input = e.target as HTMLInputElement
    const file = input.files && input.files[0]
    if (!file) return
    emit('upload', file)
    // reset input so same file can be selected again
    input.value = ''
  }
</script>

<template>
  <div class="space-y-2">
    <h4 class="text-sm font-medium text-foreground/90">Attachments ({{ props.attachments.length }})</h4>
    <div v-if="!props.attachments.length" class="text-sm text-muted-foreground">No attachments.</div>
    <ul class="grid grid-cols-2 gap-2">
      <li v-for="a in props.attachments" :key="a.id" class="rounded border border-border/60 bg-card p-2">
        <div class="flex items-center gap-2 mb-1">
          <AvatarInitials :name="a.user?.name || 'U'" class="h-6 w-6" />
          <div class="text-xs text-muted-foreground">{{ a.user?.name || 'Unknown' }}</div>
        </div>
        <a :href="a.url" target="_blank" rel="noreferrer" class="text-sm text-primary underline">Open</a>
      </li>
    </ul>

    <div class="mt-3">
      <label class="inline-flex items-center gap-2 rounded-md border border-border/60 px-3 py-2 text-sm hover:bg-accent/30 cursor-pointer">
        <input type="file" class="hidden" @change="onFileChange" />
        <span>Upload file</span>
      </label>
    </div>
  </div>
</template>
