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
  <div class="flex h-14 items-center">
    <SidebarIconAction v-if="!show" />
    <Dnd
      v-model="tagList"
      class=""
      :animation="100"
    >
      <HeaderTag v-for="tag in tagList" :key="tag.url" :label="tag.requestType" :url="tag.url" />
    </Dnd>
    <HeaderIconAdd />
  </div>
</template>
