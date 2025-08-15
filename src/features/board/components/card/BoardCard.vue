<script setup lang="ts">
import type { CardForList } from '@/api/types/list'
import CardDetailDialog from './CardDetailDialog.vue'

const props = defineProps<{
  card: CardForList
}>()

const open = ref(false)
</script>

<template>
  <div
    class="group rounded-md border border-border/60 bg-card text-card-foreground shadow-sm hover:shadow transition-shadow cursor-pointer"
    @click="open = true"
  >
    <div class="p-3 flex flex-col gap-2">
      <div class="text-sm font-medium leading-snug">{{ props.card.title }}</div>
      <div v-if="props.card.description" class="text-xs text-muted-foreground line-clamp-2">
        {{ props.card.description }}
      </div>
      <div class="flex items-center gap-2">
        <span
          v-if="props.card.description"
          class="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium bg-muted text-muted-foreground"
        >
          {{ props.card.description }}
        </span>
      </div>
    </div>
  </div>
  <CardDetailDialog v-model="open" :card-id="props.card.id" />
</template>
