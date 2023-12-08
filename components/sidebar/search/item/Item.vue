<script setup lang="ts">

</script>

<template>
  <div livraison-app="cmd-item" class="items-center rounded cursor-default flex min-h-11 select-none px-3 py-1.5 hover:bg-#f4f4f5 dark:hover:bg-#252525 cursor-pointer">
    <div livraison-app="cmd-item-icon" class="items-center text-#77757d dark:text-#a7a7a099 flex shrink-0 text-xl mr-4">
      <slot name="icon" />
    </div>
    <div livraison-app="cmd-item-label" class="text-#424149 dark:text-#eaeaea flex-1 text-sm leading-normal overflow-hidden text-ellipsis whitespace-nowrap">
      <div class="font-normal text-justify text-base leading-6 flex flex-nowrap">
        <span class="text-[#1c9ee4] shrink-0 overflow-visible whitespace-pre" />
        <div class="overflow-hidden text-ellipsis whitespace-pre">
          <slot />
        </div>
      </div>
    </div>
    <div livraison-app="cmd-item-suffix" class="gap-x-0.5 flex text-xs">
      <slot name="suffix" />
    </div>
  </div>
</template>
