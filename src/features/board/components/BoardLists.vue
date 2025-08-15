<script setup lang="ts">
  import type { List } from '@/api/types/list'
  import { ref, watch, computed } from 'vue'
  import CreateListForm from '@/features/board/components/list/CreateListForm.vue'
  import BoardList from '@/features/board/components/list/BoardList.vue'
  import { ListService } from '@/api/services'
  import Separator from '@/components/ui/separator/Separator.vue'

  const props = defineProps<{
    boardId: string | number
    initialLists?: List[]
  }>()
  const emit = defineEmits<{ (e: 'refresh'): void }>()

  const lists = ref<List[]>(props.initialLists ?? [])
  const loading = ref(false)

  watch(
    () => props.initialLists,
    (v) => {
      if (v) lists.value = v
    }
  )

  const lastOrder = computed(() => {
    // fallback if order not present
    type MaybeOrdered = List & { order?: number }
    const orders = (lists.value as MaybeOrdered[])
      .map((l) => (typeof l.order === 'number' ? l.order : undefined))
      .filter((v) => v != null) as number[]
    if (!orders.length) return 100
    return Math.max(...orders) + 10
  })
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex items-center justify-between">
      <h2 class="text-sm font-medium text-muted-foreground">Lists</h2>
    </div>
    <Separator class="opacity-60" />
    <div class="flex items-start gap-3 overflow-auto pb-1">
      <BoardList
        v-for="l in lists"
        :key="l.id"
        :list="l"
        @changed="emit('refresh')"
        @delete-list="
          async (id) => {
            await ListService.deleteList(String(id))
            emit('refresh')
          }
        "
      />
      <div class="w-72 shrink-0 rounded-lg bg-muted/40 border border-dashed border-border/60 p-2">
        <CreateListForm
          :board-id="props.boardId"
          :loading="loading"
          @create="
            async (payload) => {
              await ListService.createList({
                name: payload.name,
                boardId: String(payload.boardId),
                order: lastOrder,
              })
              emit('refresh')
            }
          "
        />
      </div>
    </div>
  </div>
</template>
