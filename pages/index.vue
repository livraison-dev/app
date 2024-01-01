<script setup lang="ts">
const linkQuery = useRouteQuery('link')
</script>

<template>
  <div>
    <Input v-model="linkQuery" />
  </div>
</template>
