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
  <div class="flex">
    <SidebarIconAction v-if="!show" />
    <template v-for="tag in tagList" :key="tag.url">
      <div>
        <HeaderTag :label="tag.requestType" :url="tag.url" />
      </div>
    </template>
    <Icon name="carbon:add" class="text-5 mt-0 cursor-pointer" />
  </div>
</template>
