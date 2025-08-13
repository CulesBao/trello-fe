<script setup lang="ts">
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from '@/components/ui/dialog'
  import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from '@/components/ui/form'
  import { Input } from '@/components/ui/input'
  import { Button } from '@/components/ui/button'
  import { toTypedSchema } from '@vee-validate/zod'
  import * as z from 'zod'
  import { useWorkspaceStore } from '@/stores/workspace'
  import { BoardService } from '@/api/services'

  interface Props {
    open: boolean
  }

  const props = defineProps<Props>()

  const emit = defineEmits<{
    'update:open': [value: boolean]
    'board-created': []
  }>()

  const formSchema = z.object({
    title: z
      .string()
      .min(1, 'Board title is required')
      .max(80, 'Board title must be less than 80 characters'),
    description: z.string().max(200, 'Description must be less than 200 characters').optional(),
    workspaceId: z.number({ required_error: 'Please select a workspace' }),
  })
  const workspaceStore = useWorkspaceStore()

  const validationSchema = toTypedSchema(formSchema)

  type FormData = z.infer<typeof formSchema>

  const isCreating = ref(false)
  const onSubmit = async (values: Record<string, unknown>) => {
    const formData = values as FormData
    isCreating.value = true

    try {
      await BoardService.createBoard({
        name: formData.title,
        description: formData.description || '',
        workspaceId: formData.workspaceId,
      })
      await workspaceStore.reload()
      emit('update:open', false)
      emit('board-created')
    } finally {
      isCreating.value = false
    }
  }

  const closeDialog = () => {
    emit('update:open', false)
  }
</script>

<template>
  <Dialog :open="props.open" @update:open="emit('update:open', $event)">
    <DialogContent class="bg-card text-card-foreground border border-border/70 shadow-sm">
      <DialogHeader>
        <DialogTitle class="text-foreground">Create New Board</DialogTitle>
        <DialogDescription class="text-muted-foreground">
          Enter details for your new board. You can invite team members later.
        </DialogDescription>
      </DialogHeader>

      <Form
        @submit="onSubmit"
        :validation-schema="validationSchema"
        class="grid gap-4 py-2 md:py-3"
      >
        <FormField v-slot="{ componentField }" name="title">
          <FormItem>
            <FormLabel class="text-muted-foreground">Board Name</FormLabel>
            <FormControl>
              <Input
                v-bind="componentField"
                placeholder="e.g. My Team Board"
                :disabled="isCreating"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="description">
          <FormItem>
            <FormLabel class="text-muted-foreground">Description (Optional)</FormLabel>
            <FormControl>
              <Input
                v-bind="componentField"
                placeholder="Brief description of your workspace"
                :disabled="isCreating"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="workspaceId">
          <FormItem>
            <FormLabel class="text-muted-foreground">Workspace</FormLabel>
            <FormControl>
              <select
                v-bind="componentField"
                class="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs focus:outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                :disabled="isCreating"
              >
                <option value="" disabled selected>Select a workspace</option>
                <option
                  v-for="workspace in workspaceStore.workspaces"
                  :key="workspace.id"
                  :value="workspace.id"
                >
                  {{ workspace.name }}
                </option>
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <div class="flex justify-end gap-2 pt-2 md:pt-3">
          <Button type="button" variant="outline" @click="closeDialog" :disabled="isCreating">
            Cancel
          </Button>
          <Button type="submit" :disabled="isCreating">
            {{ isCreating ? 'Creating...' : 'Create Board' }}
          </Button>
        </div>
      </Form>
    </DialogContent>
  </Dialog>
</template>
