<script setup lang="ts">
  import { computed, type HTMLAttributes } from 'vue'
  import Avatar from './Avatar.vue'
  import AvatarImage from './AvatarImage.vue'
  import AvatarFallback from './AvatarFallback.vue'
  import { getShortName } from '@/utils/shortName'

  const props = withDefaults(
    defineProps<{
      name: string
      src?: string
      alt?: string
      class?: HTMLAttributes['class']
    }>(),
    {
      alt: 'avatar',
    }
  )

  function hashString(str: string): number {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i)
      hash |= 0
    }
    return Math.abs(hash)
  }

  const initials = computed(() => getShortName(props.name))

  const bgColor = computed(() => {
    const h = hashString(props.name) % 360
    const s = 70
    const l = 45
    return `hsl(${h} ${s}% ${l}%)`
  })

  const textColor = computed(() => {
    return '#fff'
  })
</script>

<template>
  <Avatar :class="props.class">
    <AvatarImage v-if="props.src" :src="props.src" :alt="props.alt" />
    <AvatarFallback
      v-else
      :style="{ backgroundColor: bgColor, color: textColor }"
      class="font-medium select-none"
    >
      {{ initials }}
    </AvatarFallback>
  </Avatar>
</template>
