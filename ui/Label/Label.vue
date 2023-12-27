<script setup lang="ts">
const props = withDefaults(defineProps<{
  as?: string
  for?: string
}>(), {
  as: 'label',
})

function handleMousedown(e: MouseEvent): void {
  if (!e.defaultPrevented && e.detail > 1)
    e.preventDefault()
}
</script>

<template>
  <component :is="props.as" @mousedown="handleMousedown">
    <slot />
  </component>
</template>
