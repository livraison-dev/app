<script setup lang="ts">
const props = defineProps<{
  label: string
  url: string
}>()
</script>

<template>
  <div class="float-left text-ms cursor-pointer leading-5 flex ml-3">
    <span :class="props.label">{{ props.label }}</span>
    <span class="truncate pl-0.5 w-30 inline-block">{{ props.url }}</span>
    <Icon name="carbon:close" class="text-5 mt-0" />
  </div>
</template>

<style>

</style>
