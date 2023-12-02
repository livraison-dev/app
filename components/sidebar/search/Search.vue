<script setup lang="ts">
defineOptions({
  name: 'SidebarSearch',
})

const isMac = computed(() => process.client && navigator && navigator.userAgent && navigator.userAgent.match(/Macintosh;/))

const searchRef = ref(null)

const { elementX, elementY, isOutside } = useMouseInElement(searchRef)
</script>

<template>
  <div ref="searchRef" livraison-app="search" class="items-center border border-[color:#0000001a] dark:border-[color:#ffffff1a] cursor-pointer inline-flex text-sm h-9 relative select-none w-full mx-0 my-5 px-3 py-0 rounded-lg border-solid [background:#ffffff1a] dark:[background:#0000001a] whitespace-nowrap text-ellipsis">
    <Icon name="carbon:search" class="mr-2 text-5 color-#77757d dark:color-#a8a8a0 [user-select:none] flex-shrink-0" />
    Quick search
    <div class="flex-1" />
    <div class="text-3 text-black text-op-30 dark:text-white dark:text-op-30">
      {{ isMac ? '⌘' : 'ctrl' }} + K
    </div>
    <div
      livraison-app="effect"
      :style="`--mouse-x-size:${elementX}px;--mouse-y-size:${elementY}px;--mouse-outside:${isOutside ? '0' : '0.1'}`"
      class="opacity-[var(--mouse-outside)] pointer-events-none absolute transition-all duration-[0.2s] [will-change:background,opacity] z-[1] rounded-[inherit] inset-0 sidebar-search-effect"
    />
  </div>
</template>

<style scoped>
.dark .sidebar-search-effect{
  background: radial-gradient(64px circle at var(--mouse-x-size) var(--mouse-y-size),#eaeaea,transparent);
}
.sidebar-search-effect{
  background: radial-gradient(64px circle at var(--mouse-x-size) var(--mouse-y-size),#424149,transparent);
}
</style>
