<script setup lang="ts">
defineOptions({
  name: 'LivraisonInput',
})

const url = defineModel<string>()
</script>

<template>
  <input v-model="url" type="text">
</template>
