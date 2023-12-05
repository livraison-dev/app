# UI/Modal

## Usage

```vue
<script setup lang="ts">
const showModal = ref<boolean>(false)
</script>

<template>
  <ModalCard :show="showModal" />
</template>
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| show | `boolean` | `false` | Show modal |
