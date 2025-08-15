<script setup lang="ts">
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
  import ConfirmDialog from '@/components/ui/confirm/ConfirmDialog.vue'

  const props = withDefaults(
    defineProps<{
      name?: string
      description?: string
      loading?: boolean
    }>(),
    { name: '', description: '', loading: false }
  )

  const emit = defineEmits<{
    (e: 'save', payload: { name: string; description: string }): void
    (e: 'delete'): void
  }>()

  const form = ref({ name: props.name, description: props.description })
  watch(
    () => [props.name, props.description],
    ([n, d]) => {
      form.value.name = n || ''
      form.value.description = d || ''
    }
  )

  const confirmOpen = ref(false)
  const onAskDelete = () => {
    confirmOpen.value = true
  }
  const onConfirmDelete = () => {
    emit('delete')
    confirmOpen.value = false
  }
</script>

<template>
  <div class="flex flex-col gap-4 text-foreground/90">
    <div class="mb-2">
      <h2 class="text-xl font-semibold tracking-tight text-foreground">Board settings</h2>
      <p class="text-sm text-muted-foreground">Update this board's details or delete it.</p>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>General</CardTitle>
        <CardDescription>Basic information about this board.</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-1 gap-4 md:gap-5">
          <div>
            <label class="mb-1 block text-sm font-medium text-muted-foreground">Name</label>
            <Input v-model="form.name" placeholder="Board name" />
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium text-muted-foreground">Description</label>
            <textarea
              v-model="form.description"
              rows="4"
              placeholder="Describe your board"
              class="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter class="flex justify-end gap-3 pt-0 md:pt-2">
        <Button size="sm" :disabled="props.loading" @click="emit('save', form)">
          {{ props.loading ? 'Saving…' : 'Save changes' }}
        </Button>
      </CardFooter>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle class="text-destructive">Danger zone</CardTitle>
        <CardDescription>Delete this board and all of its data.</CardDescription>
      </CardHeader>
      <CardFooter class="flex justify-end pt-0 md:pt-2">
        <Button size="sm" variant="destructive" @click="onAskDelete">Delete board</Button>
      </CardFooter>
    </Card>
    <ConfirmDialog
      v-model:open="confirmOpen"
      title="Delete board?"
      description="This action cannot be undone. This will permanently delete this board and its data."
      confirm-text="Confirm delete"
      @confirm="onConfirmDelete"
    />
  </div>
</template>
