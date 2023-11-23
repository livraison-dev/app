<script setup lang="ts">
const showSidebar = useShowSidebarStore()

const paneSize = ref<{
  minSize: number
  size: number
  maxSize: number
}>({
  minSize: 15,
  size: 20,
  maxSize: 30,
})

watch(() => showSidebar.show, () => {
  if (showSidebar.show) {
    paneSize.value = {
      minSize: 15,
      size: 20,
      maxSize: 30,
    }
  }
  else {
    paneSize.value = {
      minSize: 0,
      size: 0,
      maxSize: 0,
    }
  }
})
</script>

<template>
  <SplitpanesPane
    class="bg-light-50 dark:bg-#050505 border-r border-gray-400/20"
    :min-size="paneSize.minSize"
    :size="paneSize.size"
    :max-size="paneSize.maxSize"
  >
    <nav class="flex flex-col">
      <SidebarActionIcon />
    </nav>
  </SplitpanesPane>
</template>
