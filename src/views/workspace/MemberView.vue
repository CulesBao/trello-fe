<script setup lang="ts">
  import type { Workspace } from '@/api'
  import { WorkspaceService } from '@/api/services'
  import Separator from '@/components/ui/separator/Separator.vue'
  import AddMemberToWorkspace from '@/components/workspace/members/AddMemberToWorkspace.vue'
  import MembersCard from '@/components/workspace/members/MembersCard.vue'
  import ConfirmDialog from '@/components/ui/confirm/ConfirmDialog.vue'

  const route = useRoute()
  const workspaceId = computed(() => route.params.id as string)
  const currentWorkspace = ref<Workspace | undefined>()
  const loadWorkspace = async () => {
    currentWorkspace.value = await WorkspaceService.getWorkspaceById(workspaceId.value)
  }
  onMounted(loadWorkspace)

  const removing = ref<number | null>(null)
  const confirmOpen = ref(false)
  const pendingRemoveId = ref<number | null>(null)
  const onRemoveMember = (userId: number) => {
    pendingRemoveId.value = userId
    confirmOpen.value = true
  }

  const onConfirmRemove = async () => {
    if (!workspaceId.value || pendingRemoveId.value == null) return
    try {
      removing.value = pendingRemoveId.value
      await WorkspaceService.removeWorkspaceMember(workspaceId.value, String(pendingRemoveId.value))
      await loadWorkspace()
    } finally {
      removing.value = null
      pendingRemoveId.value = null
      confirmOpen.value = false
    }
  }
  const onAddMember = async (email: string) => {
    await WorkspaceService.addWorkspaceMember(workspaceId.value, { email })
    await loadWorkspace()
  }

  const admins = computed(() => {
    const ws = currentWorkspace.value as unknown as Record<string, unknown> | undefined
    if (!ws) return [] as Workspace['admin']
    const adminVal = ws['admin'] as unknown
    if (Array.isArray(adminVal) && adminVal.length) return adminVal as Workspace['admin']
    const adminsVal = ws['admins'] as unknown
    if (Array.isArray(adminsVal) && adminsVal.length) return adminsVal as Workspace['admin']
    return [] as Workspace['admin']
  })
  const members = computed(() => currentWorkspace.value?.users ?? [])
</script>

<template>
  <div class="mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-8 flex flex-col gap-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold tracking-tight">Members in workspace</h1>
    </div>
    <div class="flex items-center justify-between">
      <h3 class="text-l font-bold">
        Anyone with an invitation link can join this free workspace. You can also disable and create
        a new invitation link for this workspace at any time. The number of pending invitations
        counts towards the limit of 10 collaborators.
      </h3>
    </div>
    <Separator class="my-3" />
    <div class="flex flex-col gap-5 w-full">
      <AddMemberToWorkspace @member-added="onAddMember" />
      <Separator />
      <h3 class="text-lg font-semibold">Admin ({{ admins.length }})</h3>
      <div class="flex flex-col gap-3">
        <MembersCard
          v-for="m in admins"
          :key="m.id"
          :member="{ id: m.id, name: m.name, email: m.email }"
          @remove="onRemoveMember"
        />
      </div>
      <h3 class="text-lg font-semibold">Members ({{ members.length }})</h3>
      <div class="flex flex-col gap-3">
        <MembersCard
          v-for="m in members"
          :key="m.id"
          :member="{ id: m.id, name: m.name, email: m.email }"
          @remove="onRemoveMember"
        />
      </div>
    </div>
  </div>

  <ConfirmDialog
    v-model:open="confirmOpen"
    title="Remove member?"
    description="This member will lose access to this workspace."
    :loading="removing !== null"
    confirm-text="Confirm"
    @confirm="onConfirmRemove"
  />
</template>
