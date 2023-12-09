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
      }       
    ])
</script>

<template>
  <div class="flex">
    <template v-for="tag in tagList" :key="tag.url">
        <div>
            <HeaderTag :label="tag.requestType" :url="tag.url"></HeaderTag>           
        </div>
    </template>
    <Icon name="material-symbols:add" class="text-5 mt-0 cursor-pointer"/>
  </div>
</template>

