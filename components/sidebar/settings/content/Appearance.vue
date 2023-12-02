<script setup lang="ts">
defineOptions({
  name: 'SidebarSettingsContentAppearance',
})

const colorMode = useColorMode()

const darkModeOptions = ref([
  {
    label: 'System',
    value: 'system',
  },
  {
    label: 'Light',
    value: 'light',
  },
  {
    label: 'Dark',
    value: 'dark',
  },
])
</script>

<template>
  <SidebarSettingsLayoutContent title="Appearance Settings" subtitle="Customise your Livraison Appearance">
    <div class="text-#8e8d91 dark:text-#9c9ca0 text-sm font-semibold leading-5 mb-4">
      Theme
    </div>
    <SidebarSettingsLayoutItem name="Colour Mode" desc="Choose your colour mode">
      <RadioGroup v-model="colorMode.preference" :options="darkModeOptions" />
    </SidebarSettingsLayoutItem>
  </SidebarSettingsLayoutContent>
</template>
