<script setup lang="ts">
defineOptions({
  name: 'LayoutRoot',
})

const sidebar = useSidebarStore()

const { panSize } = storeToRefs(sidebar)
</script>

<template>
  <LayoutBasic :border-positions="[]">
    <Splitpanes @resize="panSize.size = $event[0].size">
      <Sidebar />
      <SplitpanesPane :size="80" :min-size="70" :max-size="85">
        <!-- header -->
        <Header />
        <!-- bodyer -->
        <main class="mx-4">
          <slot />
        </main>
      </SplitpanesPane>
    </Splitpanes>
  </LayoutBasic>
</template>
