<script setup lang="ts">
const props = defineProps<{
  title: string
  subtitle: string
}>()
</script>

<template>
  <div class="min-h-[calc(100%_-_48px)] w-full mb-6">
    <div class="mb-6 pb-6 dark:border-b-#2e2e2e border-b-#e3e2e4 border-b border-solid">
      <div class="text-15px font-semibold leading-6 mb-1">
        {{ props.title }}
      </div>
      <div class="text-#9c9ca0 dark:text-#9c9ca0 text-xs leading-4">
        {{ props.subtitle }}
      </div>
    </div>
    <slot />
  </div>
</template>
