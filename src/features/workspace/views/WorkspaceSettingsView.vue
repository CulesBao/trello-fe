<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { WorkspaceService } from '@/api/services'
  import type { Workspace } from '@/api'
  import Input from '@/components/ui/input/Input.vue'
  import Button from '@/components/ui/button/Button.vue'
  import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
  } from '@/components/ui/card'
  import { toast } from 'vue3-toastify'
  import ConfirmDialog from '@/components/ui/confirm/ConfirmDialog.vue'

  const route = useRoute()
  const router = useRouter()
  const workspaceId = ref<string>('')

  const form = ref<{ name: string; description: string }>({ name: '', description: '' })
  const loading = ref(false)
  const deleting = ref(false)
  const confirmOpen = ref(false)

  onMounted(async () => {
    workspaceId.value = String(route.params.id || '')
    if (!workspaceId.value) return
    loading.value = true
    try {
      const ws: Workspace = await WorkspaceService.getWorkspaceById(workspaceId.value)
      form.value.name = ws.name || ''
      form.value.description = ws.description || ''
    } finally {
      loading.value = false
    }
  })

  const onSave = async () => {
    if (!workspaceId.value) return
    loading.value = true
    try {
      await WorkspaceService.updateWorkspace(workspaceId.value, {
        name: form.value.name,
        description: form.value.description,
      })
      toast.success('Workspace updated')
    } catch {
      toast.error('Failed to update workspace')
    } finally {
      loading.value = false
    }
  }

  const onDelete = async () => {
    if (!workspaceId.value) return
    confirmOpen.value = true
  }

  const onConfirmDelete = async () => {
    if (!workspaceId.value) return
    deleting.value = true
    try {
      await WorkspaceService.deleteWorkspace(workspaceId.value)
      toast.success('Workspace deleted')
      router.push('/')
    } catch {
      toast.error('Failed to delete workspace')
    } finally {
      deleting.value = false
      confirmOpen.value = false
    }
  }
</script>

<template>
  <div
    class="flex flex-col mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-8 gap-4 text-foreground/90"
  >
    <div class="mb-4 md:mb-6">
      <h1 class="text-2xl font-semibold tracking-tight text-foreground">Workspace settings</h1>
      <p class="text-sm text-muted-foreground">
        Update your workspace details or delete it permanently.
      </p>
    </div>

    <Card class="mb-4 md:mb-6 gap-4">
      <CardHeader>
        <CardTitle>General</CardTitle>
        <CardDescription>Basic information about your workspace.</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-1 gap-4 md:gap-5">
          <div>
            <label class="mb-1 block text-sm font-medium text-muted-foreground">Name</label>
            <Input v-model="form.name" placeholder="Workspace name" />
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium text-muted-foreground">Description</label>
            <textarea
              v-model="form.description"
              placeholder="Describe your workspace"
              rows="4"
              class="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
            ></textarea>
            <p class="mt-1 text-xs text-muted-foreground">
              Optional. A short sentence about the purpose of this workspace.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter class="flex justify-end gap-3 pt-0 md:pt-2">
        <Button :disabled="loading" @click="onSave">{{
          loading ? 'Saving…' : 'Save changes'
        }}</Button>
      </CardFooter>
    </Card>

    <Card class="gap-4">
      <CardHeader>
        <CardTitle class="text-destructive">Danger zone</CardTitle>
        <CardDescription>Delete this workspace and all of its data.</CardDescription>
      </CardHeader>
      <CardContent class="pt-2 md:pt-3">
        <p class="text-sm text-muted-foreground">
          This action is irreversible. Please proceed with caution.
        </p>
      </CardContent>
      <CardFooter class="flex justify-end pt-0 md:pt-2">
        <Button variant="destructive" :disabled="deleting" @click="onDelete"
          >Delete workspace</Button
        >
      </CardFooter>
    </Card>
  </div>
  <ConfirmDialog
    v-model:open="confirmOpen"
    title="Delete workspace?"
    description="This action cannot be undone. This will permanently delete this workspace and its data."
    :loading="deleting"
    confirm-text="Confirm delete"
    @confirm="onConfirmDelete"
  />
</template>
