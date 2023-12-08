<script setup lang="ts">
defineOptions({
  name: 'LivraisonAvatar',
})

const props = defineProps<{
  url: string
}>()
</script>

<template>
  <img
    class="avatar"
    :src="props.url"
  >
</template>

<style scoped>
.avatar{
  @apply h-full overflow-hidden relative w-full rounded-full;
}
</style>
