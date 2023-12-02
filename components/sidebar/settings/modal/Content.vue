<script setup lang="ts">
import {
  SidebarSettingsContentAbout,
  SidebarSettingsContentAppearance,
  SidebarSettingsContentKeyboardShortcuts,
} from '#components'

defineOptions({
  name: 'SidebarSettingsModalContent',
})
const settingsStore = useSettingsStore()

const sidebarComponent = shallowRef()

watchEffect(() => {
  if (settingsStore.sidebarComponent === SidebarSettingsContentAppearance.name)
    sidebarComponent.value = SidebarSettingsContentAppearance
  else if (settingsStore.sidebarComponent === SidebarSettingsContentKeyboardShortcuts.name)
    sidebarComponent.value = SidebarSettingsContentKeyboardShortcuts

  else if (settingsStore.sidebarComponent === SidebarSettingsContentAbout.name)
    sidebarComponent.value = SidebarSettingsContentAbout
})
</script>

<template>
  <div
    livraison-app="setting-modal-content"
    class="flex grow h-full justify-center overflow-x-hidden overflow-y-auto pt-10 pb-5 px-15px"
  >
    <div class="max-w-560px w-full">
      <SidebarSettingsLayoutContent title="Appearance Settings" subtitle="Customise your Livraison Appearance">
        <component :is="sidebarComponent" />
      </SidebarSettingsLayoutContent>
      <div class="items-center flex justify-center pb-5">
        <NuxtLink
          to="https://github.com/livraison-dev/app/issues/new"
          target="_blank"
          class="text-#eaeaea flex text-sm gap-3 leading-5.5 items-start cursor-pointer"
          rel="noreferrer"
        >
          <span class="text-#a8a8a0 flex mx-0 my-3px">
            <Icon name="carbon:chat" size="1rem" />
          </span>
          Need more customization options? Tell us in the community.
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
