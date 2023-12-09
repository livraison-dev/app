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
    <template v-for="tag in tagList" :key="tag.url">
        <div>
            <HeaderTag :label="tag.requestType" :url="tag.url"></HeaderTag>
        </div>
    </template>
        
</template>

