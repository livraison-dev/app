<script setup lang="ts">
const searchStore = useSearchStore()

const showSidebar = useSidebarStore()

const { metaSymbol } = useShortcuts()

function handleToggleLeftSidebar() {
  showSidebar.handleToggleSidebar()
  searchStore.toggleModal()
}
</script>

<template>
  <SidebarSearchItem @click="handleToggleLeftSidebar()">
    <template #icon>
      <GlobalLeftSidebar class="shrink-0 select-none" />
    </template>
    {{ showSidebar.show ? 'Collapse' : 'Expand' }} Left Sidebar
    <template #suffix>
      <Kbd :label="metaSymbol" />
      <Kbd label="/" />
    </template>
  </SidebarSearchItem>
</template>
