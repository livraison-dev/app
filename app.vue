<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
useHead({
  title: 'starter nuxt',
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/favicon.svg',
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
      <NuxtPage />
    </main>
  </NuxtLayout>
</template>

<style>
html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #000000;
  color: #ffffff;
}
</style>
