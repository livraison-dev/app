import { acceptHMRUpdate, defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', () => {
  const show = ref<boolean>(true)

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

  return {
    show,
    panSize,
    handleToggleSidebar,
  }
}, {
  persist: true,
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSidebarStore, import.meta.hot))
