<script setup lang="ts">
defineOptions({
  name: 'Modal',
})

const props = withDefaults(defineProps<{
  show: boolean
  mask?: boolean
}>(), {
  mask: false,
})

const emits = defineEmits(['clickMask'])

const bodyWrapper = ref(null)

const { isOutside } = useMouseInElement(bodyWrapper)

function handleClickMask() {
  if (isOutside.value)
    emits('clickMask')
}
</script>

<template>
  <Teleport to="body">
    <div v-if="props.show" @click="handleClickMask">
      <ModalMask v-if="props.mask" />
      <ModalBodyWrapper>
        <div ref="bodyWrapper" class="m-auto dark:text-white text-black">
          <slot />
        </div>
      </ModalBodyWrapper>
    </div>
  </Teleport>
</template>
