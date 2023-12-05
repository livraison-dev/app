<script setup lang="ts">
const props = defineProps<{
  label: string
}>()
</script>

<template>
  <div class="settings-modal-content">
    <div class="text-#9c9ca0 text-sm font-semibold leading-5 mb-4">
      {{ props.label }}
    </div>
    <slot />
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
