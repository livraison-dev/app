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
    <div v-if="props.show">
      <ModalMask />
      <ModalBodyWrapper>
        <div class="m-auto dark:text-white text-black">
          <slot />
        </div>
      </ModalBodyWrapper>
    </div>
  </Teleport>
</template>
