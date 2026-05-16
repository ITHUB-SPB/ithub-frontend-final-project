import { type NuxtConfig } from "nuxt/schema"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['better-convex-nuxt', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt', 'nuxt-auth-utils'],
  pinia: {
    storesDirs: ['./app/stores/**']
  },
  convex: {
    url: process.env.CONVEX_SELF_HOSTED_URL ?? process.env.CONVEX_URL,
    siteUrl: process.env.CONVEX_SELF_HOSTED_SITE_URL ?? process.env.CONVEX_SITE_URL,
  },
  ssr: false,
  experimental: {
    viteEnvironmentApi: true,
  },
  vite: {
    optimizeDeps: {
      include: [
        '@repo/convex/api',
      ]
    },
  },
} as NuxtConfig)