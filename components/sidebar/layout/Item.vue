<script setup lang="ts">
defineOptions({
  name: 'SidebarLayoutItem',
})

const props = withDefaults(defineProps<{
  check?: boolean
}>(), {
  check: false,
})
</script>

<template>
  <div class="item-layout" :class="[props.check ? 'bg-black bg-op-4 dark:bg-white dark:bg-op-10' : '']">
    <div class="items-center flex shrink-0 justify-start w-7">
      <slot name="icon" />
    </div>
    <div class="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
      <slot name="default" />
    </div>
  </div>
</template>

<style scoped>
.item-layout{
  @apply items-center rounded text-inherit cursor-pointer inline-flex text-sm min-h-[30px] text-left select-none w-full mt-1 px-3 py-0 hover:bg-black hover:bg-op-4 dark:hover:bg-white dark:hover:bg-op-10;
}
</style>
