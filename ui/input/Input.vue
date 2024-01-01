<script setup lang="ts">
import { useVModel } from '@vueuse/core'

defineOptions({
  name: 'LivraisonInput',
})

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    icon?: string
    placeholder?: string
    disabled?: boolean
    autofocus?: boolean
    readonly?: boolean
    type?: string
  }>(),
  {
    modelValue: '',
    type: 'text',
  },
)

const emit = defineEmits<{ (...args: any): void }>()
const input = useVModel(props, 'modelValue', emit, { passive: true })
</script>

<template>
  <div class="n-text-input flex flex items-center border app-border-base rounded py-1 pl-1 pr-2 focus-within:app-focus-base focus-within:border-context app-bg-base">
    <slot name="icon">
      <NIcon v-if="icon" :icon="icon" class="ml-0.3em mr-0.1em text-1.1em op50" />
    </slot>
    <input
      v-model="input"
      v-bind="$props as any"
      class="ml-0.4em w-full flex-auto app-bg-base !outline-none"
    >
  </div>
</template>
