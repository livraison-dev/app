export default defineNuxtConfig({
  // @see https://github.com/unocss/unocss/issues/3468#issuecomment-1871049463
  features: {
    inlineStyles: false,
  },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/devtools',
    '@nuxt/test-utils/module',
    'nuxt-icon',
    '@pinia-plugin-persistedstate/nuxt',
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
