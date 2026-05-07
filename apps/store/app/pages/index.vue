<script lang="ts" setup>
import Featured from '~/components/Featured.vue';
import { ProductCard } from '@repo/ui';
import { api } from '@repo/convex/api';
import type { DataModel } from '@repo/convex/dataModel'
import { useCart } from '~/stores/cart';

type Product = DataModel["products"]["document"]

const { data: products, error } = await useConvexQuery(
  api.products.get, 
  {}
)

const cart = useCart()

const buyNow = (product: Product) => {
  cart.addProduct({
    sku: product._id,
    price: product.current_price,
    title: product.title,
    quantity: 1
  })
}

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
        :in_cart="cart.hasProduct(product._id)"
        @buy-now="() => buyNow(product)"
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
