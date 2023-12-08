<script setup lang="ts">
const sidebar = useSidebarStore()

const { panSize, show } = storeToRefs(sidebar)
</script>

<template>
  <SplitpanesPane
    v-if="show"
    class="bg-light-50 dark:bg-#050505 border-r border-gray-400/20"
    :size="panSize.size"
    :min-size="panSize.minSize"
    :max-size="panSize.maxSize"
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
