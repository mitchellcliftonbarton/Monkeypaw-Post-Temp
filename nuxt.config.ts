import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  vite: {
    plugins: [tailwindcss()],
  },

  css: ['./app/assets/css/main.css'],

  runtimeConfig: {
    clickupToken: '',     // NUXT_CLICKUP_TOKEN
    clickupListId: '',    // NUXT_CLICKUP_LIST_ID
    airtableToken: '',    // NUXT_AIRTABLE_TOKEN
    airtableBaseId: '',   // NUXT_AIRTABLE_BASE_ID
    airtableTableName: '', // NUXT_AIRTABLE_TABLE_NAME
  },
})
