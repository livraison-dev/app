<script setup lang="ts">
defineOptions({
  name: 'SidebarSettingsSidebar',
})
const settingsStore = useSettingsStore()
</script>

<template>
  <div
    livraison-app="settings-sidebar"
    class="flex flex-col shrink-0 h-full max-w-242px w-3/12 px-0 py-5 dark:[background:#252525]"
  >
    <TitleLabel label="Settings" />
    <TitleLabel tag="h2" label="General" />
    <SidebarLayoutItem
      v-for="column in settingsSidebarColumns"
      :key="column.id"
      :livraison-app="`settings-sidebar-${column.id}`"
      :check="column.id === settingsStore.sidebarId"
      class="mt-0 mb-1 mx-4 px-2 py-0 max-w-210px"
      @click="settingsStore.setSidebarId(column.id)"
    >
      <template #icon>
        <Icon :name="column.icon" size="1rem" />
      </template>
      {{ column.title }}
    </SidebarLayoutItem>
    <slot />
  </div>
</template>
