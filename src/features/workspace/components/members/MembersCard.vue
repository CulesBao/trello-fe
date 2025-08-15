<script setup lang="ts">
  import { AvatarInitials } from '@/components/ui/avatar'
  import { Button } from '@/components/ui/button'

  defineOptions({ name: 'MembersCard' })

  interface Member {
    id: number
    name: string
    email: string
  }

  const props = defineProps<{ member: Member }>()
  const emit = defineEmits<{
    (e: 'remove', id: number): void
  }>()
  const onRemove = () => {
    emit('remove', props.member.id)
  }
</script>

<template>
  <div
    class="group flex w-full justify-between gap-4 rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-left shadow-sm transition-colors hover:bg-muted/40 dark:border-border/30"
  >
    <div class="flex flex-row justify-between items-center gap-3">
        <AvatarInitials
          :name="props.member.name"
          class="h-12 w-12 text-sm font-medium bg-muted/50 ring-1 ring-border/50"
          />
      <div class="flex min-w-0 flex-col gap-1">
        <h3
          class="text-sm font-semibold leading-tight text-foreground truncate"
          :title="props.member.name"
        >
          {{ props.member.name }}
        </h3>
        <p class="text-xs text-muted-foreground/90 truncate max-w-full" :title="props.member.email">
          {{ props.member.email }}
        </p>
      </div>
    </div>

    <div class="mr-auto flex flex-end items-center gap-2">
      <Button @click="onRemove" size="sm" variant="destructive">Remove</Button>
    </div>
  </div>
</template>
