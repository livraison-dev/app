import { acceptHMRUpdate, defineStore } from 'pinia'

export const useShowSidebarStore = defineStore('useShowSidebar', () => {
  const show = ref<boolean>(true)
  const handleToggleSidebar = () => {
    show.value = !show.value
  }
  return {
    show,
    handleToggleSidebar,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useShowSidebarStore, import.meta.hot))
