<script setup lang="ts">
const showSidebar = useShowSidebarStore()
</script>

<template>
  <div>
    <SidebarActionIcon v-if="!showSidebar.show" />
  </div>
</template>
