<script setup lang="ts">
defineOptions({
  name: 'LayoutRoot',
})

const sidebar = useSidebarStore()

function splitpanesResize(size: number) {
  sidebar.panSize.size = size
}
</script>

<template>
  <LayoutBasic :border-positions="[]">
    <Splitpanes @resize="splitpanesResize($event[0].size)">
      <Sidebar />
      <SplitpanesPane :size="80" :min-size="70" :max-size="85">
        <slot />
      </SplitpanesPane>
    </Splitpanes>
  </LayoutBasic>
</template>
