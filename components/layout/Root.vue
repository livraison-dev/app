<script setup lang="ts">
defineOptions({
  name: 'LayoutRoot',
})

const sidebar = useSidebarStore()
</script>

<template>
  <LayoutBasic :border-positions="[]">
    <Splitpanes @resize="sidebar.panSize.size = $event[0].size">
      <Sidebar />
      <SplitpanesPane :size="80" :min-size="70" :max-size="85">
        <slot />
      </SplitpanesPane>
    </Splitpanes>
  </LayoutBasic>
</template>
