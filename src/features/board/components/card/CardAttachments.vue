<script setup lang="ts">
  import { ref } from 'vue'
  import type { Attachment } from '@/api/types/card'
  import AvatarInitials from '@/components/ui/avatar/AvatarInitials.vue'
  import Button from '@/components/ui/button/Button.vue'
  import { AttachmentService } from '@/api/services/attachment.service'

  const props = defineProps<{
    attachments: Attachment[]
    cardId: number
  }>()

  const emit = defineEmits<{ (e: 'changed'): void }>()

  const uploading = ref(false)
  const deletingId = ref<number | null>(null)

  const onFileChange = (e: Event) => {
    const input = e.target as HTMLInputElement
    const file = input.files && input.files[0]
    if (!file) return
    // upload directly using service
    void (async () => {
      try {
        uploading.value = true
        await AttachmentService.uploadAttachment({ cardId: props.cardId, file })
        emit('changed')
      } finally {
        uploading.value = false
        // reset input so same file can be selected again
        input.value = ''
      }
    })()
    // reset input so same file can be selected again
    input.value = ''
  }

  const onDelete = async (id: number) => {
    if (deletingId.value) return
    deletingId.value = id
    try {
      await AttachmentService.deleteAttachment(String(id))
      emit('changed')
    } finally {
      deletingId.value = null
    }
  }
</script>

<template>
  <div class="space-y-2 gap-3 flex flex-col">
    <h4 class="text-sm font-medium text-foreground/90">
      Attachments ({{ props.attachments.length }})
    </h4>
    <div v-if="!props.attachments.length" class="text-sm text-muted-foreground">
      No attachments.
    </div>
    <ul class="grid grid-cols-2 gap-2">
      <li
        v-for="a in props.attachments"
        :key="a.id"
        class="rounded border border-border/60 bg-card p-2 flex gap-2 flex-col"
      >
        <div class="flex items-center gap-2 mb-1">
          <AvatarInitials :name="a.user?.name || 'U'" class="h-7 w-7" />
          <div class="text-xs text-muted-foreground">{{ a.user?.name || 'Unknown' }}</div>
          <div class="ml-auto">
            <Button
              size="icon"
              variant="ghost"
              class="text-destructive hover:bg-destructive/10"
              :disabled="deletingId === a.id"
              title="Delete attachment"
              aria-label="Delete attachment"
              @click="onDelete(a.id)"
            >
              <svg v-if="deletingId === a.id" class="size-4 animate-spin" viewBox="0 0 24 24">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                  fill="none"
                  opacity="0.25"
                />
                <path
                  d="M22 12a10 10 0 0 1-10 10"
                  stroke="currentColor"
                  stroke-width="4"
                  fill="none"
                />
              </svg>
              <svg
                v-else
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
        <a :href="a.url" target="_blank" rel="noreferrer" class="text-sm text-primary underline"
          >Open</a
        >
      </li>
    </ul>

    <div class="mt-3">
      <label
        class="inline-flex items-center gap-2 rounded-md border border-border/60 px-3 py-2 text-sm hover:bg-accent/30 cursor-pointer"
        :class="uploading ? 'pointer-events-none opacity-70' : ''"
      >
        <input type="file" class="hidden" @change="onFileChange" :disabled="uploading" />
        <svg v-if="uploading" class="size-4 animate-spin" viewBox="0 0 24 24">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
            fill="none"
            opacity="0.25"
          />
          <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" stroke-width="4" fill="none" />
        </svg>
        <span>{{ uploading ? 'Uploading...' : 'Upload file' }}</span>
      </label>
    </div>
  </div>
</template>
