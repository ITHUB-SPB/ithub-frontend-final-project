<script lang="ts" setup>
import { api } from '../convex/_generated/api'

const { data: brands, error } = await useConvexQuery(
  api.brands.get, 
  {}
)

console.log(brands)
</script>

<template>
  <div>
    <ul>
      <li v-for="brand in brands" :key="brand._id">{{ brand.title }}</li>
    </ul>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>
