export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/devtools',
    'nuxt-vitest',
    'nuxt-icon',
  ],
  imports: {
    dirs: [
      'composables',
      'store',
    ],
  },
  components: {
    dirs: [
      'components',
      'ui',
    ],
  },
  css: [
    '@unocss/reset/tailwind.css',
    '~/styles/splitpanes.css',
  ],
  colorMode: {
    classSuffix: '',
  },
})
