<script setup lang="ts">
import { ref } from 'vue'
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
import { WorkspaceService } from '@/api/services'

interface Props {
  open: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  'workspace-created': []
}>()

const formSchema = z.object({
  name: z.string().min(1, 'Workspace name is required').max(50, 'Workspace name must be less than 50 characters'),
  description: z.string().max(200, 'Description must be less than 200 characters').optional(),
})

const validationSchema = toTypedSchema(formSchema)

type FormData = z.infer<typeof formSchema>

const isCreating = ref(false)

const onSubmit = async (values: Record<string, unknown>) => {
  const formData = values as FormData
  isCreating.value = true

  try {
    await WorkspaceService.createWorkspace({
      name: formData.name,
      description: formData.description || ''
    })

    // Close dialog and emit success event
    emit('update:open', false)
    emit('workspace-created')
  } catch (error) {
    console.error('Error creating workspace:', error)
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
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create New Workspace</DialogTitle>
        <DialogDescription>
          Enter details for your new workspace. You can invite team members later.
        </DialogDescription>
      </DialogHeader>

      <Form @submit="onSubmit" :validation-schema="validationSchema" class="grid gap-4 py-4">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Workspace Name</FormLabel>
            <FormControl>
              <Input
                v-bind="componentField"
                placeholder="e.g. My Team Workspace"
                :disabled="isCreating"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="description">
          <FormItem>
            <FormLabel>Description (Optional)</FormLabel>
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

        <div class="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            @click="closeDialog"
            :disabled="isCreating"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            :disabled="isCreating"
          >
            {{ isCreating ? 'Creating...' : 'Create Workspace' }}
          </Button>
        </div>
      </Form>
    </DialogContent>
  </Dialog>
</template>
