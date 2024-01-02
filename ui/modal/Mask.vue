<script setup lang="ts">
defineOptions({
  name: 'LivraisonModalMask',
})

const props = withDefaults(defineProps<{
  dark?: boolean
}>(), {
  dark: true,
})
</script>

<template>
  <div
    class="pointer-events-auto fixed bg-black inset-0 z-1000"
    :class="{
      'bg-op-75': props.dark,
      'bg-op-10': !props.dark,
    }"
  />
  <div class="absolute h-0 w-0" />
</template>
