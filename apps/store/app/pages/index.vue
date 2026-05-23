<script lang="ts" setup>
import z from 'zod';
import { ProductCard } from '@repo/ui';
import { productsSchema } from '~~/server/schema';

import Featured from '~/components/Featured.vue';
import { useCartLocal } from '~/stores/cartLocal';
import { useCart } from '~/stores/cart';

const { $client } = useNuxtApp()

type Product = z.infer<typeof productsSchema>

const { loggedIn, session } = useUserSession()

const user = session.value?.user as string

const cart = loggedIn ? useCart() : useCartLocal()

console.log(cart)

const products = await $client.products.list({})

const buyNow = async (product: Product) => {
  await cart.addProduct({
    id: product.id,
    price: product.currentPrice,
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

    <p v-if="error">
      {{ error?.message }}
    </p>

    <div v-if="!error">
      <section class="products-grid">
        <ProductCard class="product-item" v-for="product in products" :key="product._id" :title="product.title"
          :current_price="product.current_price" :sku="product._id" :in_cart="cart.hasProduct(product._id)"
          :wide="false" @buy-now="buyNow(product)" />
      </section>
    </div>
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
