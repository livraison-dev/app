import { acceptHMRUpdate, defineStore } from 'pinia'

export const useSearchStore = defineStore('search', () => {
  const modalShow = ref<boolean>(false)
  function toggleModal() {
    modalShow.value = !modalShow.value
  }
  return {
    modalShow,
    toggleModal,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSearchStore, import.meta.hot))
