<script setup lang="ts">
const colorMode = useColorMode()

const colorModeOptions = ref([
  {
    label: 'System',
    value: 'system',
  },
  {
    label: 'Light',
    value: 'light',
  },
  {
    label: 'Dark',
    value: 'dark',
  },
])
</script>

<template>
  <RadioGroup v-model="colorMode.preference" :options="colorModeOptions" />
</template>
