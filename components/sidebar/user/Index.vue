<script setup lang="ts">
defineOptions({
  name: 'SidebarUser',
})
</script>

<template>
  <SidebarUserButton>
    <span class="relative inline-flex shrink-0">
      <div class="items-center flex w-10 h-10 text-5 justify-center relative select-none align-middle" livraison-app="workspace-avatar">
        <Avatar url="/avatar.png" />
      </div>
      <div class="ml-2 flex-grow overflow-hidden">
        <div class=" leading-6 font-semibold select-none overflow-hidden text-ellipsis whitespace-nowrap ml-1" livraison-app="workspace-name">
          Demo Workspace
        </div>
        <div class="flex">
          <div class="h-[22px] flex justify-start items-center text-14px text-#8e8d91 dark:text-#9c9ca0 select-none gap-1 z-[1] px-1 py-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" style="user-select: none; flex-shrink: 0;"><path fill="currentColor" fill-rule="evenodd" d="M2.75 5.389A2.639 2.639 0 0 1 5.389 2.75H18.61a2.639 2.639 0 0 1 2.639 2.639v9.444a2.639 2.639 0 0 1-2.639 2.64h-3.525l.425 1.7.797.797a.75.75 0 0 1-.53 1.28H8.222a.75.75 0 0 1-.53-1.28l.797-.798.425-1.7H5.39a2.639 2.639 0 0 1-2.639-2.639V5.39Zm1.5 8.305v1.14c0 .628.51 1.138 1.139 1.138H18.612c.628 0 1.138-.51 1.138-1.139v-1.139H4.25Zm15.5-1.5H4.25V5.39c0-.63.51-1.139 1.139-1.139H18.61c.63 0 1.139.51 1.139 1.139v6.805Zm-6.21 5.278h-3.08l-.566 2.265a1.064 1.064 0 0 1-.003.013h4.218a2.183 2.183 0 0 0-.003-.012l-.567-2.266Z" clip-rule="evenodd" /></svg>
            Local
          </div>
        </div>
      </div>
    </span>
    <slot />
  </SidebarUserButton>
</template>
