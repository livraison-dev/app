<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
useHead({
  title: 'Livraison',
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/favicon.png',
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <main font-sans text="gray-700 dark:gray-200">
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
