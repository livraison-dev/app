<script setup lang="ts">
import type { BorderPosition } from '~/interface'

const props = withDefaults(defineProps<{
  /**
   * layout width size
   * @default screen width size
   */
  w?: number
  /**
   * layout height size
   * @default screen height size
   */
  h?: number
  /**
   * background color in light mode
   * @default #FFFFFF
   */
  lightBg?: string
  /**
   * background color in dark mode
   * @default #050505
   */
  darkBg?: string
  /**
   * The position of the stroke
   * @default ['top', 'left', 'bottom', 'right']
   */
  borderPositions?: BorderPosition[]
  /**
   * border color in light mode
   * @default #E3E2E4
   */
  lightBorderColor?: string
  /**
   * border color in dark mode
   * @default #2E2E2E
   */
  darkBorderColor?: string
}>(), {
  w: undefined,
  h: undefined,
  lightBg: '#FFFFFF',
  darkBg: '#050505',
  borderPositions: () => ['top', 'left', 'bottom', 'right'],
  lightBorderColor: '#E3E2E4',
  darkBorderColor: '#2E2E2E',
})

const WindowsSize = useWindowSize()

const width = computed(() => `${props.w || WindowsSize.width.value}px`)
const height = computed(() => `${props.h || WindowsSize.height.value}px`)
const borderClass = computed(() => {
  const borderClass: string[] = []
  props.borderPositions.forEach((position) => {
    borderClass.push(`layout-border-${position}`)
  })
  return borderClass
})
</script>

<template>
  <div class="layout" :class="borderClass">
    <slot />
  </div>
</template>

<style scoped>
.layout{
  width: v-bind(width);
  height: v-bind(height);
  background-color: v-bind(lightBg);
}

.dark .layout{
  background-color: v-bind(darkBg);
}
.layout-border-top{
  border-top: 1px solid v-bind(lightBorderColor);
}
.dark .layout-border-top{
  border-top: 1px solid v-bind(darkBorderColor);
}
.layout-border-bottom{
  border-bottom: 1px solid v-bind(lightBorderColor);
}
.dark .layout-border-bottom{
  border-bottom: 1px solid v-bind(darkBorderColor);
}
.layout-border-left{
  border-left: 1px solid v-bind(lightBorderColor);
}
.dark .layout-border-left{
  border-left: 1px solid v-bind(darkBorderColor);
}
.layout-border-right{
  border-right: 1px solid v-bind(lightBorderColor);
}
.dark .layout-border-right{
  border-right: 1px solid v-bind(darkBorderColor);
}
</style>
