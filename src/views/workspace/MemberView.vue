<script setup lang="ts">
import type { Workspace } from '@/api'
import { WorkspaceService } from '@/api/services'
import Separator from '@/components/ui/separator/Separator.vue'
import AddMemberToWorkspace from '@/components/workspace/members/AddMemberToWorkspace.vue'
import MembersCard from '@/components/workspace/members/MembersCard.vue'

const route = useRoute()
const workspaceId = computed(() => route.params.id as string)
const currentWorkspace = ref<Workspace | undefined>()
const loadWorkspace = async () => {
  currentWorkspace.value = await WorkspaceService.getWorkspaceById(workspaceId.value)
}
onMounted(loadWorkspace)

const removing = ref<number | null>(null)
const onRemoveMember = async (userId: number) => {
  if (!workspaceId.value) return
  try {
    removing.value = userId
    await WorkspaceService.removeWorkspaceMember(workspaceId.value, String(userId))
    await loadWorkspace()
  } finally {
    removing.value = null
  }
}
const onAddMember = async (email: string) => {
  await WorkspaceService.addWorkspaceMember(workspaceId.value, { email })
  await loadWorkspace()
}

// Show real admins only; if backend returns empty array we keep it empty (no longer fallback to users)
// Defensive: accept either 'admin' or 'admins' key if API changes
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
  <div class="flex flex-col gap-8 p-8">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold">Members in workspace</h1>
    </div>
    <div class="flex items-center justify-between">
      <h3 class="text-l font-bold">
        Anyone with an invitation link can join this free workspace. You can also disable and create
        a new invitation link for this workspace at any time. The number of pending invitations
        counts towards the limit of 10 collaborators.
      </h3>
    </div>
    <Separator class="my-2" />
  <div class="flex flex-col gap-5 px-10 w-full max-w-6xl">
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
</template>
