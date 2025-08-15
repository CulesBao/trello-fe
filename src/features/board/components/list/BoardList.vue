<script setup lang="ts">
  import Button from '@/components/ui/button/Button.vue'
  import type { List } from '@/api/types/list'
  import CardItem from '@/features/board/components/card/BoardCard.vue'
  import CreateCardForm from '@/features/board/components/card/CreateCardForm.vue'
  import { CardService } from '@/api/services'

  const props = defineProps<{
    list: List
  }>()

  const emit = defineEmits<{
    (e: 'delete-list', id: number): void
    (e: 'changed'): void
  }>()

  const adding = ref(false)
</script>

<template>
  <div class="w-72 shrink-0 rounded-lg bg-muted/40 border border-border/60">
    <div class="flex items-center justify-between px-3 py-2">
      <h3 class="text-sm font-medium">{{ props.list.name }}</h3>
      <Button
        variant="ghost"
        size="icon"
        class="h-7 w-7 text-muted-foreground hover:text-destructive"
        @click="emit('delete-list', props.list.id)"
      >
        <span class="sr-only">Delete list</span>
        ×
      </Button>
    </div>
    <div class="px-2 pb-2 flex flex-col gap-2 max-h-[60vh] overflow-auto">
      <CardItem v-for="c in props.list.cards" :key="c.id" :card="c" />
      <div v-if="adding" class="px-1 py-1">
        <CreateCardForm
          :list-id="props.list.id"
          @create="
            async (payload) => {
              await CardService.createCard(payload)
              adding = false
              emit('changed')
            }
          "
          @cancel="adding = false"
        />
      </div>
      <Button v-else variant="ghost" size="sm" class="justify-start" @click="adding = true">
        + Add a card
      </Button>
    </div>
  </div>
</template>
