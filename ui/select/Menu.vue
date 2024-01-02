<script setup lang="ts">
const props = defineProps<{
  options: string[]
}>()

const model = defineModel<string>()

const open = ref<boolean>(false)

function toggleOpen() {
  open.value = !open.value
}

const optionsRef = ref(null)

const { height } = useElementSize(optionsRef)

const { isOutside } = useMouseInElement(optionsRef)

function handleCloseOption() {
  if (isOutside.value)
    open.value = false
}

function handleChangeSelect(arg: string) {
  model.value = arg
  open.value = false
}
</script>

<template>
  <div class="relative w-full lg:w-35">
    <div class="inline-flex w-full z-1001">
      <ButtonBase class="h-full w-40" @click="toggleOpen()">
        <span class="block truncate">{{ model }}</span>
        <span class="absolute inset-y-0 end-0 flex items-center pointer-events-none px-2.5">
          <IconBase
            class="i-carbon-chevron-down transition-transform duration-300 flex-shrink-0 text-gray-400 dark:text-gray-500 h-5 w-5"
            :class="{ 'rotate-180': open }"
          />
        </span>
      </ButtonBase>
    </div>
    <div @click="handleCloseOption()">
      <ModalMask v-if="open" :dark="false" />
    </div>
    <div
      v-if="open"
      ref="optionsRef"
      class="z-1001 group w-full absolute mt-0 inset-[auto_0px_0px_auto] border app-border-base rounded-md app-bg-base app-border-base"
      :style="`transform: translate3d(0px, ${height + 4}px, 0px)`"
    >
      <div class="z-10001">
        <ul class="relative w-full focus:outline-none overflow-y-auto scroll-py-1 p-1">
          <li
            v-for="option in props.options"
            :key="option"
            class="cursor-default w-full select-none relative flex items-center justify-between gap-1 rounded-md px-2 py-1.5 text-sm text-gray-900 dark:text-white hover:app-bg-active"
            @click="handleChangeSelect(option)"
          >
            <span class="flex items-center gap-2 min-w-0">{{ option }}</span>
            <span v-if="model === option" class="i-carbon-checkmark h-4 w-4 flex-shrink-0" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
