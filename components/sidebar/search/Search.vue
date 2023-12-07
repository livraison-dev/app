<script setup lang="ts">
defineOptions({
  name: 'SidebarSearch',
})

const { metaSymbol } = useShortcuts()

const searchRef = ref(null)

const { elementX, elementY, isOutside } = useMouseInElement(searchRef)

const searchStore = useSearchStore()

defineShortcuts({
  meta_k: {
    usingInput: true,
    handler: () => {
      searchStore.toggleModal()
    },
  },
  escape: {
    usingInput: true,
    handler: () => {
      searchStore.modalShow ? '':searchStore.toggleModal();
    },
  },
})
</script>

<template>
  <div
    ref="searchRef"
    livraison-app="search"
    class="items-center border border-[color:#000000] border-op-10 dark:border-[color:#ffffff] dark:border-op-10 cursor-pointer inline-flex text-sm h-9 relative select-none w-full mx-0 my-5 px-3 py-0 rounded-lg border-solid [background:rgba(255,255,255,0.1)] dark:[background:rgba(0,0,0,0.1)] whitespace-nowrap text-ellipsis"
    @click="searchStore.toggleModal()"
  >
    <Icon name="carbon:search" class="mr-2 text-5 color-#77757d dark:color-#a8a8a0 [user-select:none] flex-shrink-0" />
    Quick search
    <div class="flex-1" />
    <div class="text-3 text-black text-op-30 dark:text-white dark:text-op-30">
      {{ metaSymbol }} + K
    </div>
    <div
      livraison-app="effect"
      :style="`--mouse-x-size:${elementX}px;--mouse-y-size:${elementY}px;--mouse-outside:${isOutside ? '0' : '0.1'}`"
      class="opacity-[var(--mouse-outside)] pointer-events-none absolute transition-all duration-[0.2s] [will-change:background,opacity] z-[1] rounded-[inherit] inset-0 sidebar-search-effect"
    />
  </div>
  <SidebarSearchModal />
</template>

<style scoped>
.dark .sidebar-search-effect{
  background: radial-gradient(64px circle at var(--mouse-x-size) var(--mouse-y-size),#eaeaea,transparent);
}
.sidebar-search-effect{
  background: radial-gradient(64px circle at var(--mouse-x-size) var(--mouse-y-size),#424149,transparent);
}
</style>
