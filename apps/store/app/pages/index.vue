
<script lang="ts" setup>
import Featured from '~/components/Featured.vue';
import { api } from '../../convex/_generated/api'

const { data: products, error } = await useConvexQuery(
  api.products.get, 
  {}
)

</script>

<template>
  <Cta />
  <BrowseByCategory />
  <Featured />

  <p v-if="error">
    {{ error?.message }}
  </p>

  <div v-if="!error">
    <ul>
      <li v-for="product in products" :key="product._id">{{ product.title }}</li>
    </ul>
  </div>
</template>
