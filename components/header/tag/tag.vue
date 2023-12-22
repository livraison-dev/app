<script setup lang="ts">
const props = defineProps<{
  label: string
  url: string
}>()
</script>

<template>
  <div class="float-left cursor-pointer leading-5 flex ml-3 flex-[0_0_auto] p-x-2 items-center">
    <span :class="props.label">{{ props.label }}</span>
    <span class="truncate pl-0.5 w-30 inline-block">{{ props.url }}</span>
    <Icon name="carbon:close" class="text-5 mt-0 icon-hover" />
  </div>
</template>

<style>

</style>
