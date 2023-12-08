<script setup lang="ts">
defineOptions({
  name: 'LayoutRoot',
})
</script>

<template>
  <LayoutBasic :border-positions="[]">
    <Splitpanes>
      <Sidebar />
      <SplitpanesPane :size="80" :min-size="70" :max-size="85">
        <slot />
      </SplitpanesPane>
    </Splitpanes>
  </LayoutBasic>
</template>
