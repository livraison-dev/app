<script setup lang="ts">
defineOptions({
  name: 'IconButton',
})
</script>

<template>
  <button class="icon-button">
    <slot />
  </button>
</template>

<style scoped>
.icon-button{
  @apply w-8 h-8 text-6 color-zinc-500 cursor-pointer hover:bg-gray-500 hover:bg-op-20 flex justify-center items-center rounded;
}
</style>
