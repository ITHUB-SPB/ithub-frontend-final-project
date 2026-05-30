import { type NuxtConfig } from "nuxt/schema";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: ["@pinia/nuxt", "pinia-plugin-persistedstate/nuxt", "nuxt-auth-utils"],
  pinia: {
    storesDirs: ["./app/stores/**"],
  },
  vite: {
    optimizeDeps: {
      include: [],
    },
  },
} as NuxtConfig);
