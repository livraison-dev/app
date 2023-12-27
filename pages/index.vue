<script setup lang="ts">
const linkQuery = useRouteQuery('link')
</script>

<template>
  <div>
    {{ linkQuery }}
  </div>
</template>
