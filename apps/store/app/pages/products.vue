<script lang="ts" setup>
import { ProductCard, Pagination, Slider } from '@repo/ui';

import { useCartLocal } from '~/stores/cartLocal';
import { useCart } from '~/stores/cart';
import type { Product } from '~~/shared/types/products';

const { loggedIn } = useUserSession()

const cart = loggedIn ? useCart() : useCartLocal()

const activePage = ref(1)
const offset = computed(() => (activePage.value - 1) * 8)

const { data } = await useFetch('/api/products', {
  method: 'get',
  query: {
    limit: 8,
    offset
  }
})

const buyNow = async (product: Product) => {
  console.log(product)
  await cart.addProduct({
    id: product.id,
    currentPrice: product.currentPrice,
    title: product.title,
    quantity: 1
  })
}

</script>

<template>
  <main class="page">
    <div v-if="!data">loading...</div>

    <section v-else class="products-grid">
      <Slider class="products-slider" :min="Math.min(...data.items.map(item => item.currentPrice))"
        :max="Math.max(...data.items.map(item => item.currentPrice))" />

      <ProductCard class="product-item" v-for="product in data.items" :key="product.id" :title="product.title"
        :currentPrice="product.currentPrice" :id="product.id" :inCart="cart.hasProduct(product.id)" :wide="false"
        @buy-now="buyNow(product)" />

      <Pagination class="products-pagination" :active-page="activePage" :page-quantity="Math.ceil(data.total / 8)"
        @page-change="value => activePage = value" />
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

.products-slider,
.products-pagination {
  grid-column-start: span 2;
}
</style>
