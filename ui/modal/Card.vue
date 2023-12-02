<script setup lang="ts">
defineOptions({
  name: 'Modal',
})

const props = defineProps<{
  show: boolean
}>()
</script>

<template>
  <Teleport to="body">
    <ModalBodyWrapper v-if="props.show">
      <ModalMask />
      <div class="m-auto text-white">
        <slot />
      </div>
    </ModalBodyWrapper>
  </Teleport>
</template>
