<script setup lang="ts">
import {defineConfig } from 'unocss'
 const props = defineProps<{
    label:String,
    url:String
 }>() 

</script>

<template>
   <div class="float-left text-ms cursor-pointer leading-5 flex ml-3"> 
    <span  :class="props.label">{{ props.label }}</span>
   <span class="truncate pl-0.5 w-30 inline-block">{{ props.url }}</span> 
   <Icon name="material-symbols:close" class="text-5 mt-0"/>
   </div>
   
</template>

<style>

</style>