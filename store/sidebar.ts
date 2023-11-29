import { acceptHMRUpdate, defineStore } from 'pinia'

export const useSidebarStore = defineStore('useShowSidebar', () => {
  const show = ref<boolean>(true)

  const size = ref<number>(0)

  const panSize = ref<{
    minSize: number
    size: number
    maxSize: number
  }>({
    minSize: 15,
    size: 0,
    maxSize: 30,
  })

  const handleToggleSidebar = () => {
    show.value = !show.value
  }

  function handleMoveSize() {
    size.value = panSize.value.size
  }

  function handleClearSize() {
    handleMoveSize()
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
    handleMoveSize,
    handleToggleSidebar,
    handleClearSize,
    handleCreateSize,
  }
}, {
  persist: true,
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSidebarStore, import.meta.hot))
