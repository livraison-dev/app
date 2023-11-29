<script setup lang="ts">
const sidebar = useSidebarStore()

watch(() => sidebar.show, () => {
  if (sidebar.show)
    sidebar.handleCreateSize()

  else
    sidebar.handleClearSize()
})
</script>

<template>
  <SplitpanesPane
    class="bg-light-50 dark:bg-#050505 border-r border-gray-400/20"
    :size="sidebar.panSize.size"
    :min-size="sidebar.panSize.minSize"
    :max-size="sidebar.panSize.maxSize"
  >
    <nav class="flex flex-col" livraison-app="sideabr">
      <SidebarIconAction />
      <SidebarLayoutInner>
        <div livraison-app="user-actions" class="flex px-4 py-1 [flex-flow:column_nowrap]">
          <SidebarUser />
          <SidebarSearch />
          <SidebarSettings />
        </div>
      </SidebarLayoutInner>
    </nav>
  </SplitpanesPane>
</template>
