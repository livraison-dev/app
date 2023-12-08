<script setup lang="ts">
const props = defineProps<{
  label: string
  handle: () => void
}>()
</script>

<template>
  <SidebarSearchItem @click="props.handle">
    <template #icon>
      <Icon name="carbon:settings" class="shrink-0 select-none" />
    </template>
    {{ props.label }}
  </SidebarSearchItem>
</template>
