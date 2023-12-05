<script setup lang="ts">

</script>

<template>
  <div livraison-app="cmd-item" class="items-center rounded cursor-default flex min-h-11 select-none px-3 py-1.5 hover:bg-#252525 cursor-pointer">
    <div livraison-app="cmd-item-icon" class="items-center text-[#a7a7a099] flex shrink-0 text-xl mr-4">
      <slot name="icon" />
    </div>
    <div livraison-app="cmd-item-label" class="text-[#eaeaea] flex-1 text-sm leading-normal overflow-hidden text-ellipsis whitespace-nowrap">
      <slot />
    </div>
    <div livraison-app="cmd-item-suffix" class="gap-x-0.5 flex text-xs">
      <slot name="suffix" />
    </div>
  </div>
</template>
