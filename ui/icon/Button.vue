<script setup lang="ts">
defineOptions({
  name: 'LivraisonIconButton',
})
</script>

<template>
  <button class="icon-button">
    <slot />
  </button>
</template>

<style scoped>
.icon-button{
  @apply w-8 h-8 text-6 color-zinc-500 cursor-pointer flex justify-center items-center icon-hover;
}
</style>
