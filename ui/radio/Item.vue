<script setup lang="ts">
const props = withDefaults(defineProps<{
  label: string
  value: string
  check?: boolean
}>(), {
  check: false,
})
</script>

<template>
  <button type="button" role="radio" class="radio-button" :data-state="props.check ? 'checked' : 'unchecked'">
    <span class="radio-button-item radio-button-hidden">{{ props.label }}</span>
    <span v-if="props.check" :data-state="props.check ? 'checked' : 'unchecked'" class="radio-button-item">{{ props.label }}</span>
  </button>
</template>

<style scoped>
.radio-button:not(:last-of-type) {
  @apply mr-1;
}

.radio-button {
  @apply flex-grow hover:bg-white hover:bg-opacity-10 cursor-pointer hover:rounded-lg;
}
[data-state="checked"] > .radio-button-hidden {
  @apply hidden;
}
.radio-button-item{
  @apply text-#9c9ca0 [filter:none];
  @apply items-center flex text-xs font-semibold h-6 justify-center select-none whitespace-nowrap rounded-lg;
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.1));
}
.radio-button-item[data-state=checked] {
    background: #000000;
}
</style>
