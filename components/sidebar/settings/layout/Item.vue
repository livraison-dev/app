<script setup lang="ts">
defineOptions({
  name: 'SidebarSettingsLayoutItem',
})

const props = defineProps<{
  name: string
  desc: string
}>()
</script>

<template>
  <div class="col">
    <div class="left-col">
      <div class="name">
        {{ props.name }}
      </div>
      <div class="desc">
        {{ props.desc }}
      </div>
    </div>
    <div class="right-col">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.col{
  @apply items-center flex justify-between;
}
.two{
  @apply text-#eaeaea mb-25px rounded-lg;
}
.col.two .left-col {
  @apply flex-shrink-0 max-w-8/10;
}

.col .left-col {
  @apply flex-1 max-w-full;
}
.col .right-col {
  @apply flex flex-shrink-0 justify-end pl-15px;
}
.col .name {
  @apply mb-0.5 font-semibold text-sm;
}
.col .desc {
  @apply text-#9c9ca0 text-xs;
}
</style>
