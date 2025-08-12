<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog'

const props = withDefaults(defineProps<{
  open: boolean
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  loading?: boolean
}>(), {
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  loading: false,
})

const emit = defineEmits<{
  (e: 'update:open', v: boolean): void
  (e: 'confirm'): void
}>()

const onCancel = () => emit('update:open', false)
const onConfirm = () => emit('confirm')
</script>

<template>
  <Dialog :open="props.open" @update:open="(v:boolean) => emit('update:open', v)">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ props.title }}</DialogTitle>
        <DialogDescription v-if="props.description">{{ props.description }}</DialogDescription>
      </DialogHeader>
      <DialogFooter class="flex justify-end gap-2">
        <DialogClose as-child>
          <Button variant="secondary" @click="onCancel">{{ props.cancelText }}</Button>
        </DialogClose>
        <Button variant="destructive" :disabled="props.loading" @click="onConfirm">{{ props.loading ? 'Processing…' : props.confirmText }}</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
