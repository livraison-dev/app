import { acceptHMRUpdate, defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', () => {
  const modalShow = ref<boolean>(false)
  function toggleModalShow() {
    modalShow.value = !modalShow.value
  }
  return {
    modalShow,
    toggleModalShow,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSettingsStore, import.meta.hot))
