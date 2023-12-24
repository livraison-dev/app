<script setup lang="ts">
const props = defineProps<{
  label: string
  url: string
}>()
</script>

<template>
  <div class="float-left cursor-pointer leading-5 flex flex-[0_0_auto] p-x-2 items-center">
    <Label :class="props.label">{{ props.label }}</Label>
    <Label class="truncate pl-0.5 w-30 inline-block">{{ props.url }}</Label>
    <Icon name="carbon:close" class="text-5 mt-0 icon-hover" />
  </div>
</template>

<style>

</style>
