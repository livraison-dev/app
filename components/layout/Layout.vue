<script setup lang="ts">
import type { BorderPosition, } from '~/interface'

const WindowsSize = useWindowSize()

const props = withDefaults(defineProps<{
  w?:number,
  h?:number,
  lightBg?: string,
  darkBg?: string,
  borderPositions?: BorderPosition[],
  lightBorderColor?: string
  darkBorderColor?: string
}>(),{
  w: undefined,
  h: undefined,
  lightBg: '#FFFFFF',
  darkBg: '#050505',
  borderPositions: () => ['top','left','bottom','right'],
  lightBorderColor: '#E3E2E4',
  darkBorderColor: '#2E2E2E'
})

const width = computed(() => `${props.w || WindowsSize.width.value}px`)
const height = computed(() => `${props.h || WindowsSize.height.value}px`)
const borderClass = computed(() => {
  const borderClass:string[] = []
  props.borderPositions.forEach((position) => {
    borderClass.push(`layout-border-${position}`)
  })
  return borderClass
})
</script>

<template>
  <div class="layout" :class="borderClass">
    <slot/>
  </div>
</template>

<style>
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
