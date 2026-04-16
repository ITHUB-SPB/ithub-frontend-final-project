
<script lang="ts" setup>
import { api } from '../../convex/_generated/api'

const { data: brands, error } = await useConvexQuery(
  api.brands.get, 
  {}
)

</script>

<template>
  <Cta />
  <BrowseByCategory />

  <p v-if="error">
    {{ error?.message }}
  </p>

  <div v-if="!error">
    <ul>
      <li v-for="brand in brands" :key="brand._id">{{ brand.title }}</li>
    </ul>
  </div>
</template>
