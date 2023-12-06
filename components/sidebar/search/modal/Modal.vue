<script setup lang="ts">
const searchStore = useSearchStore()
</script>

<template>
  <ModalCard
    :show="searchStore.modalShow"
    @click-mask="searchStore.toggleModal()"
  >
    <div
      :data-state="searchStore.modalShow ? 'entered' : 'exited'"
      class="sidebar-search-modal-box sidebar-search-modal-box-shadow"
    >
      <div class="flex flex-col h-full">
        <SidebarSearchModalLabel />
        <SidebarSearchModalInput />
        <div
          class="
            h-[min(330px,calc(1500.0px_+_8px))]
            max-h-100
            min-h-30
            overflow-auto
            overscroll-contain
            pl-1.5
            pr-0
            pt-0
            pb-2
            [scroll-padding-block:12px]
            [scrollbar-gutter:stable]
          "
          style="ransition: height .1s ease;"
        >
          <div livraison-app="cmd-list">
            <SidebarSearchItemGroup title="Recent" />
            <SidebarSearchItemGroup title="Settings">
              <SidebarSearchListSettingColorMode />
            </SidebarSearchItemGroup>
            <SidebarSearchItemGroup title="Layout Controls">
              <SidebarSearchListToggleSidebar />
            </SidebarSearchItemGroup>
            <SidebarSearchItemGroup title="Navigation">
              <SidebarSearchListGoToSettings />
            </SidebarSearchItemGroup>
          </div>
        </div>
      </div>
    </div>
  </ModalCard>
</template>

<style scoped>
.sidebar-search-modal-box{
  @apply pointer-events-auto z-1000 relative;
  @apply rounded-xl bg-#fbfbfc dark:bg-#1e1e1e;
  @apply w-160 min-w-120 max-w-[calc(100vw-50px)];
  outline: none;
  will-change: transform,opacity;
}
.sidebar-search-modal-box-shadow{
  box-shadow: 0px 10px 80px 0px rgba(0,0,0,.2);
}
.dark .sidebar-search-modal-box-shadow{
  box-shadow: 0px 16px 80px 0px rgba(0,0,0,.8);
}
.sidebar-search-modal-box[data-state=entered],.sidebar-search-modal-box[data-state=entering] {
  animation: open-modal 120ms ease-in-out;
  animation-fill-mode: forwards
}

.sidebar-search-modal-box[data-state=exited],.sidebar-search-modal-box[data-state=exiting] {
  animation: close-modal 120ms ease-in-out;
  animation-fill-mode: forwards
}

@keyframes open-modal {
  0% {
    opacity: 0;
    transform: translateY(-2%) scale(0.96)
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1)
  }
}

@keyframes close-modal {
  to {
    opacity: 0;
    transform: translateY(-2%) scale(0.96)
  }
  0% {
    opacity: 1;
    transform: translateY(0) scale(1)
  }
}
</style>
