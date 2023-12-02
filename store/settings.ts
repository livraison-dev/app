import { acceptHMRUpdate, defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', () => {
  const modalShow = ref<boolean>(false)

  function toggleModalShow() {
    resetSidebarId()
    modalShow.value = !modalShow.value
  }

  const sidebarId = ref<string>('appearance')
  const sidebarComponent = ref<string>('SidebarSettingsContentAppearance')

  function resetSidebarId() {
    sidebarId.value = 'appearance'
    sidebarComponent.value = 'SidebarSettingsContentAppearance'
  }

  function setSidebarId(id: string) {
    sidebarId.value = id
    settingsSidebarColumns.forEach((column) => {
      if (column.id === id)
        sidebarComponent.value = column.components
    })
  }

  return {
    modalShow,
    toggleModalShow,
    sidebarId,
    sidebarComponent,
    resetSidebarId,
    setSidebarId,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSettingsStore, import.meta.hot))
