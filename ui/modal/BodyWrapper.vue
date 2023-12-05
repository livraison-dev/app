<script setup lang="ts">
defineOptions({
  name: 'ModalBodyWrapper',
})
</script>

<template>
  <div
    livraison-app="body-wrapper"
    class="modal-body-wrapper"
  >
    <div livraison-app="scrollbar" class="modal-body-wrapper-scrollbar">
      <div livraison-app="scrollbar-container" class="modal-body-wrapper-scrollbar-container">
        <div livraison-app="scrollbar-content" class="modal-body-wrapper-scrollbar-content">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-body-wrapper{
  @apply fixed left-0 right-0 top-0 bottom-0 visible z-999999;
}
.modal-body-wrapper-scrollbar {
  @apply overflow-hidden relative z-auto h-full w-full;
}
.modal-body-wrapper-scrollbar-container{
  @apply w-full overflow-scroll h-full min-h-inherit max-h-inherit;
  scrollbar-width: none;
}
.modal-body-wrapper-scrollbar-content{
  @apply box-border min-w-full min-h-full flex relative;
}
</style>
