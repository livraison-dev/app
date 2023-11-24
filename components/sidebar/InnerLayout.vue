<script setup lang="ts">
defineOptions({
  name: 'SidebarInnerLayout',
})
</script>

<template>
  <div class="h-[calc(100%-3.5rem)] flex flex-[1_1_auto] flex-col gap-y-1" livraison-app="inner">
    <slot />
  </div>
</template>
