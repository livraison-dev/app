<script setup lang="ts">
const props = withDefaults(defineProps<{
  tag?: 'h1' | 'h2'
  label: string
}>(), {
  tag: 'h1',
})
</script>

<template>
  <div :class="`title-${props.tag}`">
    {{ props.label }}
  </div>
</template>

<style scoped>
.title-h1{
  @apply leading-[calc(1em_+_8px)] pl-6 pr-4 py-0 text-lg font-semibold;
}
.title-h2{
  @apply items-center text-[#9c9ca0] flex text-sm justify-between mt-5 mb-1 leading-[calc(1em+8px)] pl-6 pr-4 py-0;
}
</style>
