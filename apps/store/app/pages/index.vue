
<script lang="ts" setup>
import Featured from '~/components/Featured.vue';
import { ProductCard } from '@repo/ui';
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
    <section class="products-grid">
      <ProductCard 
        class="product-item" 
        v-for="product in products" 
        :key="product._id" 
        :title="product.title" 
        :current_price="product.current_price" 
      />
    </section>
  </div>
</template>

<style scoped>
  .products-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(4, max-content);
    gap: 16px;
    padding: 56px 16px;
  }
</style>
