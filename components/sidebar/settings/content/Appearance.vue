<script setup lang="ts">
defineOptions({
  name: 'SidebarSettingsContentAppearance',
})
</script>

<template>
  <SidebarSettingsLayoutContent title="Appearance Settings" subtitle="Customise your Livraison Appearance">
    <SidebarSettingsLayoutIngredient label="Theme">
      <SidebarSettingsLayoutItem name="Colour Mode" desc="Choose your colour mode">
        <ColorMode />
      </SidebarSettingsLayoutItem>
    </SidebarSettingsLayoutIngredient>
  </SidebarSettingsLayoutContent>
</template>
