<script setup lang="ts">
import { version } from '~/package.json'

defineOptions({
  name: 'SidebarSettingsContentAbout',
})

const communitieOptions = ref([
  {
    icon: 'github',
    url: 'https://github.com/livraison-dev',
    label: 'GitHub',
  },
  {
    icon: 'twitter',
    url: 'https://twitter.com/elonehoo',
    label: 'Twitter',
  },
  {
    icon: 'discord',
    url: 'https://discord.gg/UGzqwWeaBS',
    label: 'Discord',
  },
  {
    icon: 'youtube',
    url: 'https://www.youtube.com/channel/UCffin0qZ945zKigeJ0JIDkA',
    label: 'YouTube',
  },
  {
    icon: 'mastodon',
    url: 'https://elk.zone/mstdn.social/@elonehoo',
    label: 'Mastodon',
  },
])
</script>

<template>
  <SidebarSettingsLayoutContent title="About Livraison" subtitle="Information about Livraison">
    <SidebarSettingsLayoutIngredient label="Version">
      <SidebarSettingsLayoutItem name="App Version" :desc="version" />
    </SidebarSettingsLayoutIngredient>
    <SidebarSettingsLayoutIngredient label="Communities">
      <div class="grid gap-[2%] grid-cols-[15%_15%_15%_15%_15%_15%]">
        <IconLabel
          v-for="communitie in communitieOptions"
          :key="communitie.icon"
          :icon-name="communitie.icon"
          :url="communitie.url"
          :label="communitie.label"
        />
      </div>
    </SidebarSettingsLayoutIngredient>
  </SidebarSettingsLayoutContent>
</template>
