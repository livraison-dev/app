<script setup lang="ts">
defineOptions({
  name: 'SidebarSettingsModal',
})
const settingsStore = useSettingsStore()
</script>

<template>
  <ModalCard
    mask
    :show="settingsStore.modalShow"
  >
    <div
      class="sidebar-settings-modal-box-shadow sidebar-settings-modal-box"
    >
      <SidebarSettingsModalCloseButton />
      <SidebarSettingsModalSidebar />
      <SidebarSettingsModalContent />
    </div>
  </ModalCard>
</template>

<style scoped>
.sidebar-settings-modal-box{
  @apply max-h-85vh max-w-70vw overflow-hidden flex pointer-events-auto p-0;
  @apply bg-#fbfbfc dark:bg-#1e1e1e box-border text-base;
  @apply h-760px leading-1.6 font-normal w-1080px rounded-xl left-2/4 top-2/4;
  @apply min-h-[194px] -translate-x-2/4 -translate-y-2/4;
  @apply fixed z-[1000];
  outline: none;
}
.sidebar-settings-modal-box-shadow{
  box-shadow: 0px 0px 30px 0px rgba(0,0,0,.1),0px 0px 8px 0px rgba(0,0,0,.18),0px 0px 0px 0.5px #303030 inset;;
}
</style>
