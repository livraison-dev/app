<script setup lang="ts">
const showSidebar = useShowSidebarStore()
</script>

<template>
  <div>
    <SidebarIconAction v-if="!showSidebar.show" />
  </div>
</template>
