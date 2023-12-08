<script setup lang="ts">
defineOptions({
  name: 'LivraisonIconLabel',
})

const props = defineProps<{
  iconName: IconLabelIconName
  url: string
  label: string
}>()

type IconLabelIconName = 'github' | 'twitter' | 'discord' | 'youtube' | 'twitch' | 'mastodon'

const iconLogos: {
  label: IconLabelIconName
  value: any
}[] = [
  {
    label: 'github',
    value: 'carbon:logo-github',
  },
  {
    label: 'twitter',
    value: 'logos:twitter',
  },
  {
    label: 'discord',
    value: 'logos:discord-icon',
  },
  {
    label: 'youtube',
    value: 'logos:youtube-icon',
  },
  {
    label: 'twitch',
    value: 'logos:twitch',
  },
  {
    label: 'mastodon',
    value: 'logos:mastodon-icon',
  },
]

const icon = computed(() => {
  return iconLogos.find(icon => icon.label === props.iconName)?.value
})
</script>

<template>
  <NuxtLink target="_blank" rel="noreferrer" :to="props.url" class="label">
    <Icon
      :name="icon"
      size="1.5rem"
      class="icon"
    />
    <p class="text-xs text-center">
      {{ props.label }}
    </p>
  </NuxtLink>
</template>

<style scoped>
.label{
  @apply border text-[#eaeaea] cursor-pointer px-2 py-1.5 rounded-lg border-solid border-[#2e2e2e];
}
.icon{
  display: block;
  height: 24px;
  margin: 0 auto 2px;
  width: 24px;
}
</style>
