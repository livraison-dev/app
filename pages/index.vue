<script setup lang="ts">
const showSidebar = useSidebarStore()
</script>

<template>
  <div>
    <SidebarIconAction v-if="!showSidebar.show" />
    <Header></Header>
  </div>
</template>
