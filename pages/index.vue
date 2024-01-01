<script setup lang="ts">
const linkQuery = useRouteQuery('link')
</script>

<template>
  <div>
    <div class="w-full relative">
      <Input v-model="linkQuery" />
      <div class="absolute right-2 top-1.5 flex flex-gap-1">
        <ButtonBase
          title="Copy URL"
          app="xs blue"
          icon="carbon:copy"
          :border="false"
        />
      </div>
    </div>
  </div>
</template>
