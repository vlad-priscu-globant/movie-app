// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: {enabled: true},
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxtjs/tailwindcss', '@nuxtjs/supabase',],
  runtimeConfig: {
    API_KEY: process.env.API_KEY || '', public: {
      NUXT_PUBLIC_BASE_URL: process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000',
      TMDB_IMAGE_BASE: process.env.NUXT_PUBLIC_TMDB_IMAGE_BASE || 'https://image.tmdb.org/t/p/w500'
    }
  },
  supabase: {
    redirect: false
  },
  app: {
    head: {
      title: 'Movie App',
      meta: [{name: 'description', content: 'A movie app that users can save favorite movies.'}],
      htmlAttrs: {
        lang: 'en',
      },
    }
  }
})