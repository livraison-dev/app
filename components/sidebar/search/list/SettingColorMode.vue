<script setup lang="ts">
const colorMode = useColorMode()
const settingColorModeList = ref<{
  label: string
  value: string
  handle: () => void
}[]>([
      {
        label: 'Change Colour Mode to System',
        value: 'system',
        handle: () => {
          colorMode.preference = 'system'
        },
      },
      {
        label: 'Change Colour Mode to Dark',
        value: 'dark',
        handle: () => {
          colorMode.preference = 'dark'
        },
      },
      {
        label: 'Change Colour Mode to Light',
        value: 'light',
        handle: () => {
          colorMode.preference = 'light'
        },
      },
    ])
</script>

<template>
  <template v-for="setting in settingColorModeList" :key="setting.label">
    <SidebarSearchListSettingList
      v-if="setting.value !== colorMode.preference"
      :label="setting.label"
      :handle="setting.handle"
    />
  </template>
</template>
