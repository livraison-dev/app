<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'

defineOptions({
  name: 'LivraisonDnd',
})
</script>

<template>
  <VueDraggable>
    <slot />
  </VueDraggable>
</template>
