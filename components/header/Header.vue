<script setup lang="ts">
const tagList = ref<{
  requestType: string
  url: string
}[]>([
  {
    requestType: 'GET',
    url: 'https://livraison-app.vercel.app',
  },
  {
    requestType: 'POST',
    url: 'https://livraison-app.vercel.app',
  },
])

const sidebar = useSidebarStore()

const { show } = storeToRefs(sidebar)
</script>

<template>
  <div class="flex h-14">
    <SidebarIconAction v-if="!show" />
    <template v-for="tag in tagList" :key="tag.url">
      <HeaderTag :label="tag.requestType" :url="tag.url" />
    </template>
    <HeaderIconAdd />
  </div>
</template>
