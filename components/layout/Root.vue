<script setup lang="ts">
defineOptions({
  name: 'LayoutRoot',
})

const sidebar = useSidebarStore()

const { panSize, show } = storeToRefs(sidebar)
</script>

<template>
  <LayoutBasic :border-positions="[]">
    <Splitpanes @resize="panSize.size = $event[0].size">
      <Sidebar />
      <SplitpanesPane :size="show ? 80 : 100" :min-size="show ? 70 : 100" :max-size="show ? 85 : 100">
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
