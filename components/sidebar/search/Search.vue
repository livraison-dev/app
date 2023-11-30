<script setup lang="ts">
defineOptions({
  name: 'SidebarSearch',
})

const isMac = computed(() => {
  return navigator.platform.toUpperCase().includes('MAC')
})

const searchRef = ref(null)

const { elementX, elementY, isOutside } = useMouseInElement(searchRef)
</script>

<template>
  <div ref="searchRef" livraison-app="search" class="items-center border border-[color:#ffffff1a] cursor-pointer inline-flex text-sm h-9 relative select-none w-full mx-0 my-5 px-3 py-0 rounded-lg border-solid [background:#0000001a] whitespace-nowrap text-ellipsis">
    <Icon name="carbon:search" class="mr-2 text-5 color-#a8a8a0 [user-select:none] flex-shrink-0" />
    Quick search
    <div class="flex-1" />
    <div class="text-3 text-white text-op-30">
      {{ isMac ? '⌘' : 'ctrl' }} + K
    </div>
    <div
      livraison-app="effect"
      :style="`--mouse-x-size:${elementX}px;--mouse-y-size:${elementY}px;--mouse-outside:${isOutside ? '0' : '0.1'}`"
      class="sidebar-search-effect"
    />
  </div>
</template>

<style scoped>
.sidebar-search-effect{
  @apply opacity-[var(--mouse-outside)] pointer-events-none absolute transition-all duration-[0.2s] [will-change:background,opacity] z-[1] rounded-[inherit] inset-0;
  background: radial-gradient(64px circle at var(--mouse-x-size) var(--mouse-y-size),#eaeaea,transparent);
}
</style>
