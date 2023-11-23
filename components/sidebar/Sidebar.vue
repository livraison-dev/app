<script setup lang="ts">
</script>

<template>
  <SplitpanesPane
    class="bg-light-50 dark:bg-#050505"
    border="r t gray-400/20"
    min-size="15"
    max-size="30"
  >
    <slot />
  </SplitpanesPane>
</template>
