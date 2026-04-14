import { type NuxtConfig } from "nuxt/schema"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['better-convex-nuxt'],
  convex: {
    url: process.env.CONVEX_SELF_HOSTED_URL
  }
} as NuxtConfig)