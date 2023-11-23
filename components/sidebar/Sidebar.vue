<script setup lang="ts">
const showSidebar = useShowSidebarStore()

const show = ref<boolean>(false)

const paneSize = ref<{
  minSize: number
  size: number
  maxSize: number
}>({
  minSize: 15,
  size: 20,
  maxSize: 30,
})

onMounted(() => {
  show.value = true
})
watch(() => showSidebar.show, () => {
  if (showSidebar.show) {
    paneSize.value = {
      minSize: 15,
      size: 20,
      maxSize: 30,
    }
  }
  else {
    paneSize.value = {
      minSize: 0,
      size: 0,
      maxSize: 0,
    }
  }
})
</script>

<template>
  <SplitpanesPane
    v-if="show"
    class="bg-light-50 dark:bg-#050505"
    border="r t gray-400/20"
    :min-size="paneSize.minSize"
    :size="paneSize.size"
    :max-size="paneSize.maxSize"
  >
    <nav class="flex flex-col">
      <SidebarActionIcon />
      <div>avatar and username</div>
      <div>search</div>
      <div>all request</div>
      <div>settings</div>
      <div>Favourites</div>
    </nav>
  </SplitpanesPane>
</template>

<style scoped>

</style>
