<script setup lang="ts">
defineOptions({
  name: 'LivraisonKbd',
})
const props = defineProps<{
  label: string
}>()
</script>

<template>
  <div class="items-center bg-#eeeeee dark:bg-#303030 rounded text-#8e8d91 dark:text-#9c9ca0 flex h-5 justify-center w-6 px-1 py-0">
    {{ props.label }}
  </div>
</template>
