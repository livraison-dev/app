<script setup lang="ts">
defineOptions({
  name: 'ModalMask',
})
</script>

<template>
  <div class="pointer-events-auto fixed bg-black bg-op-75 inset-0 z-1000" />
  <div class="absolute h-0 w-0" />
</template>
