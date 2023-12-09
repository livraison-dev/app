<script setup lang="ts">
 const props = defineProps<{
    label:String,
    url:String
 }>() 

</script>

<template>
   <div class="float-left text-ms cursor-pointer"> 
    <span id="rType" class="truncate inline-block">{{ props.label }}</span>
   <span class="truncate pl-2 w-30 inline-block">{{ props.url }}</span> 
   </div>
   
</template>

<style>

</style>