<script setup lang="ts">
  import NotificationSheet from '@/components/notifications/NotificationSheet.vue'
  import Separator from '@/components/ui/separator/Separator.vue'
  import { BoardService } from '@/api/services'
  import type { Board } from '@/api/types/board'
  import BoardLists from '@/features/board/components/BoardLists.vue'
  import BoardHeaderBar from '@/features/board/components/header/BoardHeaderBar.vue'
  import BoardSettingsDialog from '@/features/board/components/dialogs/BoardSettingsDialog.vue'

  const open = ref(false)
  const settingsOpen = ref(false)
  const router = useRouter()
  const route = useRoute()

  const board = ref<Board | null>(null)

  const loadBoard = async () => {
    const id = String(route.params.id || '')
    if (!id) return
    board.value = await BoardService.getBoardById(id)
  }

  onMounted(loadBoard)

  // no-op
</script>

<template>
  <BoardHeaderBar @open-notifications="open = true" @open-settings="settingsOpen = true" />
  <Separator />
  <!-- Page content -->
  <div
    class="flex flex-col w-full min-h-screen px-4 py-6 md:px-8 md:py-8 gap-6 bg-background text-foreground"
  >
    <BoardLists
      v-if="board"
      :board-id="board.id"
      :initial-lists="board.lists"
      @refresh="loadBoard()"
    />
  </div>
  <NotificationSheet v-model:open="open" />
  <BoardSettingsDialog
    v-model="settingsOpen"
    :board="board"
    @add="
      async (email: string) => {
        const id = String(route.params.id || '')
        if (!id) return
        await BoardService.addBoardMember(id, { email })
        await loadBoard()
      }
    "
    @remove="
      async (id: number) => {
        const bid = String(route.params.id || '')
        if (!bid) return
        await BoardService.removeBoardMember(bid, String(id))
        await loadBoard()
      }
    "
    @save="
      async (payload: { name: string; description: string }) => {
        const id = String(route.params.id || '')
        if (!id) return
        await BoardService.updateBoard(id, payload)
        await loadBoard()
      }
    "
    @delete="
      async () => {
        const id = String(route.params.id || '')
        if (!id) return
        await BoardService.deleteBoard(id)
        router.push('/')
      }
    "
  />
</template>
