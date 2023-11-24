<script setup lang="ts">
defineOptions({
  name: 'SidebarUserButton',
})
</script>

<template>
  <button class="sideabr-user-button" livraison-app="sideabr-user-button">
    <slot />
  </button>
</template>

<style scoped>
.sideabr-user-button{
  @apply h-[58px] flex items-center text-[#424149] px-1.5 py-0 rounded-lg [outline:none] hover:bg-gray-100 hover:bg-op-6;
  -webkit-box-align: center;
}
</style>
