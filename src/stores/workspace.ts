// stores/workspace.ts
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { WorkspaceService } from '@/api/services'
import type { Workspace } from '@/api/types/workspace'

export const useWorkspaceStore = defineStore('workspace', () => {
  const workspaces: Ref<Workspace[]> = ref([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const setWorkspaces = (items: Workspace[]) => {
    workspaces.value = items
  }

  const loadWorkspaces = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await WorkspaceService.getWorkspaces()
      workspaces.value = data
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Failed to load workspaces'
      error.value = message
      workspaces.value = []
    } finally {
      loading.value = false
    }
  }

  const reload = async () => {
    await loadWorkspaces()
  }

  return { workspaces, loading, error, setWorkspaces, loadWorkspaces, reload }
})
