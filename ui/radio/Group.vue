<script setup lang="ts">
defineOptions({
  name: 'RadioGroup',
})
const props = defineProps<{
  modelValue: string
  options: {
    label: string
    value: string
  }[]
}>()

const emits = defineEmits(['update:modelValue'])

function handleRadioChange(value: string) {
  emits('update:modelValue', value)
}
</script>

<template>
  <div role="radiogroup" class="radio-group">
    <RadioItem
      v-for="option in props.options"
      :key="option.value"
      :label="option.label"
      :value="option.value"
      :check="option.value === props.modelValue"
      @click="handleRadioChange(option.value)"
    />
  </div>
</template>

<style scoped>
.radio-group{
  @apply w-250px [outline:none] items-center inline-flex justify-between p-0.5 rounded-2.5 grow max-w-250px min-w-150px;
  -webkit-app-region: no-drag;
  background: #f5f5f5;
}
.dark .radio-group{
  background: #2a2a2a;
}
</style>
