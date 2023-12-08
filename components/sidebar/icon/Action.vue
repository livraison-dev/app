<script setup lang="ts">
defineOptions({
  name: 'SidebarActionIcon',
})
const showSidebar = useSidebarStore()

function handleSidebarToggle() {
  showSidebar.handleToggleSidebar()
}

defineShortcuts({
  'meta_/': {
    usingInput: true,
    handler: () => {
      showSidebar.handleToggleSidebar()
    },
  },
})
</script>

<template>
  <div class="h-14 items-center flex flex-[0_0_auto] p-x-16px justify-between">
    <IconButton
      @click="handleSidebarToggle"
    >
      <GlobalLeftSidebar />
    </IconButton>
  </div>
</template>
