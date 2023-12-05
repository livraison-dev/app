<script setup lang="ts">
defineOptions({
  name: 'SidebarSettings',
})

const settingsStore = useSettingsStore()
</script>

<template>
  <SidebarLayoutItem @click="settingsStore.toggleModalShow()">
    <template #icon>
      <Icon name="carbon:settings" class="text-5 color-#77757d dark:color-#a8a8a0" />
    </template>
    Settings
  </SidebarLayoutItem>
  <SidebarSettingsModal />
</template>
