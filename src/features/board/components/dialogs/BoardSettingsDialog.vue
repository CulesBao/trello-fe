<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { Dialog, DialogContent } from '@/components/ui/dialog'
  import BoardMembersPanel from '@/features/board/components/dialogs/BoardMembersPanel.vue'
  import BoardSettingsPanel from '@/features/board/components/dialogs/BoardSettingsPanel.vue'
  import { Users, LayoutGrid } from 'lucide-vue-next'
  import type { Board } from '@/api/types/board'

  const props = defineProps<{
    modelValue: boolean
    board: Board | null
  }>()
  const emit = defineEmits<{
    (e: 'update:modelValue', v: boolean): void
    (e: 'add', email: string): void
    (e: 'remove', id: number): void
    (e: 'save', payload: { name: string; description: string }): void
    (e: 'delete'): void
  }>()

  const open = computed({
    get: () => props.modelValue,
    set: (v: boolean) => emit('update:modelValue', v),
  })

  const activeTab = ref<'members' | 'boards'>('members')
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent
      class="p-0 overflow-hidden sm:max-w-5xl bg-card border border-border/70 shadow-lg"
    >
      <div class="flex">
        <!-- Left vertical tabs -->
        <div class="flex w-48 shrink-0 flex-col border-r border-border/70 bg-card/70 p-2 gap-1">
          <button
            class="inline-flex items-center justify-start gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent/30 hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            :class="
              activeTab === 'members' ? 'bg-accent/40 text-foreground' : 'text-muted-foreground'
            "
            @click="activeTab = 'members'"
          >
            <Users class="h-4 w-4" />
            <span>Members</span>
          </button>
          <button
            class="inline-flex items-center justify-start gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent/30 hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            :class="
              activeTab === 'boards' ? 'bg-accent/40 text-foreground' : 'text-muted-foreground'
            "
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
            :admins="props.board?.admin ? [props.board.admin] : []"
            :members="props.board?.users || []"
            @add="(email: string) => emit('add', email)"
            @remove="(id: number) => emit('remove', id)"
          />
          <BoardSettingsPanel
            v-else
            :name="props.board?.name"
            :description="props.board?.description"
            @save="(payload) => emit('save', payload)"
            @delete="() => emit('delete')"
          />
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
