<script lang="ts" setup>
import z from 'zod';

import { ProductCard, Pagination } from '@repo/ui';

import { useCartLocal } from '~/stores/cartLocal';
import { useCart } from '~/stores/cart';
import { productsSchema } from '~~/server/schema';

type Product = z.infer<typeof productsSchema>

const { loggedIn, session } = useUserSession()

const user = session.value?.user as string

const cart = loggedIn ? useCart() : useCartLocal()

const activePage = ref(1)
const pageQuantity = ref(3)

const { data: products } = await useFetch('/api/products', {
  method: 'get',
  query: {
    limit: 8,
    offset: (activePage.value - 1) * 8
  }
})

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
    <section class="products-grid">
      <ProductCard class="product-item" v-for="product in products" :key="product.id" :title="product.title"
        :currentPrice="product.currentPrice" :id="product.id" :inCart="cart.hasProduct(product.id)" :wide="false"
        @buy-now="buyNow(product)" />
    </section>
    <Pagination :active-page="activePage" :page-quantity="pageQuantity" @page-change="value => activePage = value" />
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
