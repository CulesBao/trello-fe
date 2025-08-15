<script setup lang="ts">
  import NotificationSheet from '@/components/notifications/NotificationSheet.vue'
  import TrelloLogo from '@/assets/trello_logo.png'
  import Button from '@/components/ui/button/Button.vue'
  import { Bell, Settings } from 'lucide-vue-next'
  import { useNotificationLogStore } from '@/stores/notificationLog'
  import {
    Dialog,
    DialogContent,
  } from '@/components/ui/dialog'
  import BoardMembersPanel from '@/features/board/components/dialogs/BoardMembersPanel.vue'
  import BoardSettingsPanel from '@/features/board/components/dialogs/BoardSettingsPanel.vue'
  import { Users, LayoutGrid } from 'lucide-vue-next'
  import Separator from '@/components/ui/separator/Separator.vue'
  import { BoardService } from '@/api/services'
  import type { Board } from '@/api/types/board'
  import BoardLists from '@/features/board/components/BoardLists.vue'

  const open = ref(false)
  const settingsOpen = ref(false)
  const activeTab = ref<'members' | 'boards'>('members')
  const logStore = useNotificationLogStore()
  const router = useRouter()
  const route = useRoute()

  const board = ref<Board | null>(null)

  const loadBoard = async () => {
    const id = String(route.params.id || '')
    if (!id) return
    board.value = await BoardService.getBoardById(id)
  }

  onMounted(loadBoard)

  const handleClick = () => {
    router.push('/')
  }
</script>

<template>
  <!-- Top header bar -->
  <header
    class="sticky top-0 z-40 w-full border-b border-border/70 bg-background"
  >
  <div class="w-full px-4 md:px-8">
      <div class="h-12 md:h-14 flex items-center justify-between gap-2">
        <div class="flex h-9 items-center gap-2 cursor-pointer select-none" @click="handleClick">
          <div
            class="flex aspect-square size-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground shrink-0"
          >
            <img :src="TrelloLogo" alt="Trello" class="size-6" />
          </div>
          <div class="flex items-center text-sm font-semibold text-foreground">
            <span class="truncate">Trello</span>
          </div>
        </div>
        <div class="flex h-9 items-center gap-1.5">
          <Button
            size="icon"
            variant="ghost"
            class="relative text-muted-foreground hover:text-foreground hover:bg-accent/20"
            @click="open = true"
          >
            <Bell class="h-5 w-5" />
            <span class="sr-only">Notifications</span>
            <span
              v-if="logStore.recent.length"
              class="absolute -top-1 -right-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-medium text-white"
              >{{ logStore.recent.length > 99 ? '99+' : logStore.recent.length }}</span
            >
          </Button>
          <Button
            size="icon"
            variant="ghost"
            class="text-muted-foreground hover:text-foreground hover:bg-accent/20"
            @click="settingsOpen = true"
          >
            <Settings class="h-5 w-5" />
            <span class="sr-only">Settings</span>
          </Button>
        </div>
      </div>
    </div>
  </header>
  <Separator/>
  <!-- Page content -->
  <div class="flex flex-col w-full min-h-screen px-4 py-6 md:px-8 md:py-8 gap-6 bg-background text-foreground">
    <BoardLists
      v-if="board"
      :board-id="board.id"
      :initial-lists="board.lists"
      @refresh="loadBoard()"
    />
  </div>
  <NotificationSheet v-model:open="open" />

  <!-- Settings dialog with vertical tabs -->
  <Dialog v-model:open="settingsOpen">
    <DialogContent class="p-0 overflow-hidden sm:max-w-5xl bg-card border border-border/70 shadow-lg">
      <div class="flex">
        <!-- Left vertical tabs -->
        <div class="flex w-48 shrink-0 flex-col border-r border-border/70 bg-card/70 p-2 gap-1">
          <button
            class="inline-flex items-center justify-start gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent/30 hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            :class="activeTab === 'members' ? 'bg-accent/40 text-foreground' : 'text-muted-foreground'"
            @click="activeTab = 'members'"
          >
            <Users class="h-4 w-4" />
            <span>Members</span>
          </button>
          <button
            class="inline-flex items-center justify-start gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent/30 hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            :class="activeTab === 'boards' ? 'bg-accent/40 text-foreground' : 'text-muted-foreground'"
            @click="activeTab = 'boards'"
          >
            <LayoutGrid class="h-4 w-4" />
            <span>Boards</span>
          </button>
        </div>
        <!-- Right content -->
        <div class="flex-1 max-h-[80vh] overflow-auto p-4 md:p-6 bg-background/95">
          <BoardMembersPanel
            v-if="activeTab === 'members'"
            :admins="board?.admin ? [board.admin] : []"
            :members="board?.users || []"
            @add="async (email: string) => {
              const id = String(route.params.id || '')
              if (!id) return
              await BoardService.addBoardMember(id, { email })
              await loadBoard()
            }"
            @remove="async (id: number) => {
              const bid = String(route.params.id || '')
              if (!bid) return
              await BoardService.removeBoardMember(bid, String(id))
              await loadBoard()
            }"
          />
          <BoardSettingsPanel
            v-else
            :name="board?.name"
            :description="board?.description"
            @save="async (payload: { name: string; description: string }) => {
              const id = String(route.params.id || '')
              if (!id) return
              await BoardService.updateBoard(id, payload)
              await loadBoard()
            }"
            @delete="async () => {
              const id = String(route.params.id || '')
              if (!id) return
              await BoardService.deleteBoard(id)
              router.push('/')
            }"
          />
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
