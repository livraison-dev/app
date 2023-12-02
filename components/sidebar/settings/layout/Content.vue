<script setup lang="ts">
const props = defineProps<{
  title: string
  subtitle: string
}>()
</script>

<template>
  <div class="min-h-[calc(100%_-_48px)] w-full mb-6">
    <div class="mb-6 pb-6 border-b-[#2e2e2e] border-b border-solid">
      <div class="text-15px font-semibold leading-6 mb-1">
        {{ props.title }}
      </div>
      <div class="text-#9c9ca0 text-xs leading-4">
        {{ props.subtitle }}
      </div>
    </div>
    <div class="settings-modal-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.settings-modal-content:last-of-type {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
}

.settings-modal-content {
    border-bottom: 1px solid #2e2e2e;
    margin-bottom: 24px;
    padding-bottom: 24px;
}
</style>
