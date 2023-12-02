<script setup lang="ts">
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
    <main font-sans text="gray-700 dark:gray-200 z-10">
      <LayoutRoot>
        <NuxtPage />
      </LayoutRoot>
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
