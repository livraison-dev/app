import { acceptHMRUpdate, defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', () => {
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


  return {
    size,
    show,
    panSize,
    handleToggleSidebar,
  }
}, {
  persist: true,
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSidebarStore, import.meta.hot))
