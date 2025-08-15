<script setup lang="ts">
  import Separator from '@/components/ui/separator/Separator.vue'
  import MembersCard from '@/features/workspace/components/members/MembersCard.vue'
  import Button from '@/components/ui/button/Button.vue'
  import Input from '@/components/ui/input/Input.vue'
  import ConfirmDialog from '@/components/ui/confirm/ConfirmDialog.vue'

  type Member = { id: number; name: string; email: string }

  const props = withDefaults(
    defineProps<{
      admins?: Member[]
  members?: Member[]
    }>(),
    {
      admins: () => [],
      members: () => [],
    }
  )

  const emit = defineEmits<{
    (e: 'add', email: string): void
    (e: 'remove', id: number): void
  }>()

  const email = ref('')
  const onAdd = () => {
    const v = email.value.trim()
    if (!v) return
    emit('add', v)
    email.value = ''
  }

  const confirmOpen = ref(false)
  const pendingRemoveId = ref<number | null>(null)
  const onAskRemove = (id: number) => {
    pendingRemoveId.value = id
    confirmOpen.value = true
  }
  const onConfirmRemove = () => {
    if (pendingRemoveId.value == null) return
    emit('remove', pendingRemoveId.value)
    pendingRemoveId.value = null
    confirmOpen.value = false
  }
</script>

<template>
  <div class="flex flex-col gap-4">
    <div>
      <h2 class="text-xl font-semibold tracking-tight text-foreground">Members in board</h2>
      <p class="text-sm text-muted-foreground">
        Invite people to this board. You can add/remove members anytime.
      </p>
    </div>

    <div class="flex items-center gap-2">
      <Input v-model="email" placeholder="Email" class="max-w-xs" />
      <Button size="sm" @click="onAdd">Add</Button>
    </div>

    <Separator class="opacity-60" />

    <div class="flex flex-col gap-5 w-full">
      <h3 class="text-lg font-semibold text-foreground">Admin ({{ props.admins.length }})</h3>
      <div class="flex flex-col gap-3">
        <MembersCard
          v-for="m in props.admins"
          :key="m.id"
          :member="{ id: Number(m.id), name: m.name ?? '', email: m.email ?? '' }"
          @remove="onAskRemove"
        />
      </div>
      <h3 class="text-lg font-semibold text-foreground">Members ({{ props.members.length }})</h3>
      <div class="flex flex-col gap-3">
        <MembersCard
          v-for="m in props.members"
          :key="m.id"
          :member="{ id: Number(m.id), name: m.name ?? '', email: m.email ?? '' }"
          @remove="onAskRemove"
        />
      </div>
    </div>
  </div>
  <ConfirmDialog
    v-model:open="confirmOpen"
    title="Remove member?"
    description="This member will lose access to this board."
    confirm-text="Confirm"
    @confirm="onConfirmRemove"
  />
</template>
