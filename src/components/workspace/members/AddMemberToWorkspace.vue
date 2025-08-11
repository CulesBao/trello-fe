<script setup lang="ts">
  import { ref } from 'vue'
  import Button from '@/components/ui/button/Button.vue'
  import Input from '@/components/ui/input/Input.vue'

  const emit = defineEmits<{
    'member-added': [email: string]
  }>()

  const email = ref('')

  const onAddMember = () => {
    emit('member-added', email.value)
  }
</script>
<template>
  <div
    class="flex flex-row items-center gap-3 rounded-lg p-3 text-center"
  >
    <Input v-model="email" class="" type="email" placeholder="Email" />
    <Button class="w-24" variant="outline" @click="onAddMember">Add</Button>
  </div>
</template>
