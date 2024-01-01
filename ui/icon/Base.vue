<script setup lang="ts">
defineProps<{
  icon?: string
}>()
</script>

<template>
  <div class="app-icon" :class="icon" />
</template>
