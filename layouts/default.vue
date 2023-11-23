<script setup lang="ts">

</script>

<template>
  <Layout :border-positions="[]">
    <Splitpanes>
      <Sidebar />
      <SplitpanesPane :size="80" :min-size="70" :max-size="85">
        <slot />
      </SplitpanesPane>
    </Splitpanes>
  </Layout>
</template>
