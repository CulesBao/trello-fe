<script setup lang="ts">
  import { ref, watch, computed } from 'vue'
  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
  } from '@/components/ui/dialog'
  import Button from '@/components/ui/button/Button.vue'
  import type { Card } from '@/api/types/card'
  import { CardService } from '@/api/services'
  import CardComments from './CardComments.vue'
  import CardChecklist from './CardChecklist.vue'
  import CardAttachments from './CardAttachments.vue'

  const props = defineProps<{
    modelValue: boolean
    cardId?: number
  }>()
  const emit = defineEmits<{
    (e: 'update:modelValue', v: boolean): void
    (e: 'deleted', id: number): void
  }>()

  const open = computed({
    get: () => props.modelValue,
    set: (v: boolean) => emit('update:modelValue', v),
  })

  const card = ref<Card | null>(null)
  const editingDesc = ref(false)
  const descDraft = ref('')
  const savingDesc = ref(false)
  const deleting = ref(false)

  const load = async () => {
    if (props.cardId == null) return
    card.value = await CardService.getCardById(String(props.cardId))
    descDraft.value = card.value?.description || ''
    editingDesc.value = false
  }

  watch(
    () => [props.modelValue, props.cardId],
    ([o]) => {
      if (o) load()
    }
  )

  const startEditDesc = () => {
    if (!card.value) return
    descDraft.value = card.value.description || ''
    editingDesc.value = true
  }

  const saveDesc = async () => {
    if (!card.value) return
    try {
      savingDesc.value = true
      const updated = await CardService.updateCard(String(card.value.id), {
        title: card.value.title,
        description: descDraft.value,
      })
      card.value = updated
      editingDesc.value = false
    } finally {
      savingDesc.value = false
    }
  }

  const cancelDesc = () => {
    descDraft.value = card.value?.description || ''
    editingDesc.value = false
  }

  const deleteCard = async () => {
    if (!card.value || deleting.value) return
    deleting.value = true
    await CardService.deleteCard(String(card.value.id))
    emit('deleted', card.value.id)
    emit('update:modelValue', false)
  }
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent class="sm:max-w-5xl overflow-hidden">
      <DialogHeader class="p-0">
        <div class="flex items-start justify-between gap-4">
          <div>
            <DialogTitle>{{ card?.title || 'Card details' }}</DialogTitle>
            <DialogDescription v-if="card?.list?.name">
              In list: {{ card.list.name }}
            </DialogDescription>
          </div>
          <div v-if="card" class="flex flex-col items-end gap-1">
            <div class="flex items-center gap-1">
              <Button
                size="icon"
                variant="ghost"
                class="text-destructive hover:bg-destructive/10"
                :disabled="deleting"
                title="Delete card"
                aria-label="Delete card"
                @click="deleteCard"
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
            <div class="text-xs text-muted-foreground text-right leading-5">
              <div>
                Created: {{ card?.createAt ? new Date(card.createAt).toLocaleString() : '-' }}
              </div>
            </div>
          </div>
        </div>
      </DialogHeader>
      <div
        class="text-sm md:grid md:grid-cols-3 gap-3 flex flex-col max-h-[70vh] overflow-y-auto pr-2"
      >
        <!-- Left column -->
        <div class="gap-3 flex flex-col md:col-span-2 space-y-4">
          <div class="rounded-lg border bg-card p-4">
            <div class="flex items-center justify-between mb-1">
              <h4 class="font-medium text-foreground/90">Description</h4>
              <Button
                v-if="!editingDesc"
                size="sm"
                variant="ghost"
                class="h-7 px-2 text-xs"
                @click="startEditDesc"
              >
                Edit
              </Button>
            </div>
            <div v-if="!editingDesc" @click="startEditDesc" class="cursor-text">
              <p class="text-muted-foreground whitespace-pre-wrap min-h-6">
                {{ card?.description || 'Add a more detailed description...' }}
              </p>
            </div>
            <form v-else class="space-y-2" @submit.prevent="saveDesc">
              <textarea
                v-model="descDraft"
                rows="4"
                class="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                placeholder="Add a more detailed description..."
              />
              <div class="flex items-center gap-2">
                <Button type="submit" size="sm" :disabled="savingDesc">Save</Button>
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  :disabled="savingDesc"
                  @click="cancelDesc"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>

          <div class="rounded-lg border bg-card p-4">
            <CardChecklist
              v-if="card"
              :items="card.checkLists"
              :card-id="card.id"
              @changed="load"
            />
          </div>

          <div class="rounded-lg border bg-card p-4">
            <CardAttachments
              v-if="card"
              :attachments="card.attachments"
              :card-id="card.id"
              @changed="load"
            />
          </div>
        </div>

        <!-- Right column -->
        <div class="md:col-span-1 mt-6 md:mt-0">
          <div class="rounded-lg border bg-card p-4 md:sticky md:top-4">
            <CardComments
              v-if="card"
              :comments="card.comments"
              :card-id="card.id"
              @changed="load"
            />
          </div>
        </div>
      </div>
      <div class="flex justify-end pt-4">
        <Button size="sm" variant="secondary" @click="open = false">Close</Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
