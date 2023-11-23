<script setup lang="ts">

</script>

<template>
  <Layout :border-positions="[]">
    <Splitpanes>
      <Sidebar>
        UserName
      </Sidebar>
      <SplitpanesPane>
        <slot />
      </SplitpanesPane>
</Splitpanes>
  </Layout>
</template>
