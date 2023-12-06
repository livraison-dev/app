<script setup lang="ts">
const searchStore = useSearchStore()

const settingsStore = useSettingsStore()

function handleGoToSettings() {
  searchStore.toggleModal()
  settingsStore.toggleModalShow()
}
</script>

<template>
  <SidebarSearchItem @click="handleGoToSettings">
    <template #icon>
      <Icon name="carbon:arrow-right" class="shrink-0 select-none" />
    </template>
    Go to Settings
  </SidebarSearchItem>
</template>
