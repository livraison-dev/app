<script setup lang="ts">
const settingsStore = useSettingsStore()
</script>

<template>
  <button class="plain close-button close-button-size z-10001" @click="settingsStore.toggleModalShow()">
    <Icon name="carbon:close-large" size="1.25rem" class="cursor-pointer" />
  </button>
</template>

<style scoped>
.plain{
  @apply text-#8e8d91 dark:text-#a8a8a0 border-transparent;
  @apply hover:bg-black hover:bg-op-4 dark:hover:bg-white dark:hover:bg-op-10;
  background: transparent;
}
.close-button{
  @apply items-center border rounded cursor-pointer inline-flex text-xl h-6 justify-center touch-manipulation transition-all duration-[0.3s] select-none w-6 border-solid;
  -webkit-app-region: no-drag;
  outline: 0;
}
.close-button-size {
    position: absolute;
    right: 20px;
    top: 22px;
}
</style>
