<script setup lang="ts">
defineOptions({
  name: 'SidebarSearchComdGroup',
})

const props = defineProps<{
  title: string
}>()
</script>

<template>
  <div livraison-app="cmd-group">
    <div
      livraison-app="cmd-group-title"
      class="pt-4 p-2 text-#9c9ca0 text-xs font-semibold leading-[1.67]"
    >
      {{ props.title }}
    </div>
    <div livraison-app="cmd-group-list">
      <slot />
    </div>
  </div>
</template>
