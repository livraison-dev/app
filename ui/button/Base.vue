<script setup lang="ts">
import { NuxtLink } from '#components'

withDefaults(defineProps<{
  to?: string
  icon?: string
  border?: boolean
  disabled?: boolean
  type?: 'submit' | 'reset' | 'button'
}>(), {
  border: true,
  type: 'button',
})
</script>

<template>
  <Component
    :is="to ? NuxtLink : 'button'"
    :to="to"
    v-bind="{ ...$attrs, ...(!to && { type }) }"
    :class="[
      { 'app-button-base active:app-button-active focus-visible:app-focus-base hover:app-button-hover': border },
      { 'app-icon-button': !$slots.default },
    ]"
    class="app-button app-transition app-disabled:app-disabled"
  >
    <slot name="icon">
      <IconBase v-if="icon" :icon="icon" :class="{ 'app-button-icon': $slots.default }" />
    </slot>
    <slot />
  </Component>
</template>
