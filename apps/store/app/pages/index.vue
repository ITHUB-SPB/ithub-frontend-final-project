<script lang="ts" setup>
import z from 'zod';

import { ProductCard } from '@repo/ui';
import Featured from '~/components/Featured.vue';
import { useCartLocal } from '~/stores/cartLocal';
import { useCart } from '~/stores/cart';
import { productsSchema } from '~~/server/schema';

// const { $client } = useNuxtApp()

type Product = z.infer<typeof productsSchema>

const { loggedIn, session } = useUserSession()

const user = session.value?.user as string

const cart = useCartLocal()

// const products = await useFetch($client.products.list({}))
const { data: products } = await useFetch('/api/products', {
  query: {
    limit: 8,
    offset: 0
  }
})

console.log(products)

const buyNow = async (product: Product) => {
  console.log(product)
  await cart.addProduct({
    id: product.id,
    currentPrice: product.currentPrice,
    title: product.title,
    quantity: 1
  }, user || "anonymous")
}

</script>

<template>
  <main class="page">
    <Cta />
    <BrowseByCategory />
    <Featured />

    <section class="products-grid" v-if="products">
      <ProductCard class="product-item" v-for="product in products" :key="product.id" :title="product.title"
        :currentPrice="product.currentPrice" :id="product.id" :inCart="cart.hasProduct(product.id)" :wide="false"
        @buy-now="buyNow(product)" />
    </section>
  </main>
</template>

<style scoped>
.page {
  flex: 1;
}

.products-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(4, max-content);
  gap: 16px;
  padding: 56px 16px;
}
</style>
