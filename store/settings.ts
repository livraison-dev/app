import { acceptHMRUpdate, defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', () => {
  const modalShow = ref<boolean>(false)

  function toggleModalShow() {
    resetSidebarId()
    modalShow.value = !modalShow.value
  }

  const sidebarId = ref<string>('appearance')

  function resetSidebarId() {
    sidebarId.value = 'appearance'
  }

  function setSidebarId(id: string) {
    sidebarId.value = id
  }

  return {
    modalShow,
    toggleModalShow,
    sidebarId,
    resetSidebarId,
    setSidebarId,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSettingsStore, import.meta.hot))
