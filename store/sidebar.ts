import { acceptHMRUpdate, defineStore } from 'pinia'

export const useSidebarStore = defineStore('useShowSidebar', () => {
  const show = ref<boolean>(true)

  const size = ref<number>(20)

  const panSize = ref<{
    minSize: number
    size: number
    maxSize: number
  }>({
    minSize: 15,
    size: 20,
    maxSize: 30,
  })

  const handleToggleSidebar = () => {
    show.value = !show.value
  }

  function handleClearSize() {
    size.value = panSize.value.size
    panSize.value = {
      minSize: 0,
      size: 0,
      maxSize: 0,
    }
  }

  function handleCreateSize() {
    panSize.value = {
      minSize: 15,
      size: size.value,
      maxSize: 30,
    }
  }
  return {
    size,
    show,
    panSize,
    handleToggleSidebar,
    handleClearSize,
    handleCreateSize,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSidebarStore, import.meta.hot))
