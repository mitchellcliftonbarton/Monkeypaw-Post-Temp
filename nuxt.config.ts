import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
    head: {
      titleTemplate: '%s | Monkeypaw Post',
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: "Monkeypaw Post, Jordan Peele's post-production company, blends craft and culture through editorial, color, sound, and finishing services for film and television." },
      ],
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  css: ['./app/assets/css/main.css'],

  runtimeConfig: {
    clickupToken: '', // NUXT_CLICKUP_TOKEN
    clickupListId: '', // NUXT_CLICKUP_LIST_ID
    airtableToken: '', // NUXT_AIRTABLE_TOKEN
    airtableBaseId: '', // NUXT_AIRTABLE_BASE_ID
    airtableTableName: '', // NUXT_AIRTABLE_TABLE_NAME
  },

  modules: ['nuxt-gtag'],

  gtag: {
    id: 'G-BZWBV3GEG5',
  },
})