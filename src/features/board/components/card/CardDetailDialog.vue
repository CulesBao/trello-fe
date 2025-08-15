<script setup lang="ts">
  import { ref, watch, computed } from 'vue'
  import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
  import Separator from '@/components/ui/separator/Separator.vue'
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
  const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void }>()

  const open = computed({
    get: () => props.modelValue,
    set: (v: boolean) => emit('update:modelValue', v),
  })

  const card = ref<Card | null>(null)

  const load = async () => {
    if (props.cardId == null) return
    card.value = await CardService.getCardById(String(props.cardId))
  }

  watch(
    () => [props.modelValue, props.cardId],
    ([o]) => {
      if (o) load()
    }
  )
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent class="sm:max-w-xl">
      <DialogHeader>
        <DialogTitle>{{ card?.title || 'Card details' }}</DialogTitle>
        <DialogDescription v-if="card?.list?.name">
          In list: {{ card.list.name }}
        </DialogDescription>
      </DialogHeader>
      <div class="space-y-5 text-sm">
        <div>
          <h4 class="font-medium text-foreground/90">Description</h4>
          <p class="text-muted-foreground whitespace-pre-wrap min-h-6">
            {{ card?.description || 'No description' }}
          </p>
        </div>
        <Separator />
        <div class="grid grid-cols-2 gap-2">
          <div class="text-muted-foreground">Created</div>
          <div>{{ card ? new Date(card.createdAt).toLocaleString() : '-' }}</div>
          <div class="text-muted-foreground">Updated</div>
          <div>{{ card ? new Date(card.updatedAt).toLocaleString() : '-' }}</div>
        </div>
        <Separator />
        <CardComments v-if="card" :comments="card.comments" />
        <Separator />
        <CardChecklist v-if="card" :items="card.checkLists" />
        <Separator />
        <CardAttachments v-if="card" :attachments="card.attachments" />
      </div>
      <div class="flex justify-end pt-2">
        <Button size="sm" variant="secondary" @click="open = false">Close</Button>
      </div>
    </DialogContent>
  </Dialog>

</template>
