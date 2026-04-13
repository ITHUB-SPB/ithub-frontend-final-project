import { type NuxtConfig } from "nuxt/schema"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['better-convex-nuxt'],
  convex: {
    url: 'http://localhost:1331/'
  }
} as NuxtConfig)