<script lang="ts" setup>
import { api } from '@repo/convex/api'
import { ProductCard } from '@repo/ui'

import { useCartLocal } from '~/stores/cartLocal';
import { useCartConvex } from '~/stores/cartConvex';

import airpodsMaxImage from '~/assets/images/products/airpods_max.png'

const { user, loggedIn } = useUserSession()

const cart = loggedIn ? useCartConvex() : useCartLocal()

// TODO уточнять список интересующих продуктов
const { data: products, error } = await useConvexQuery(
  api.products.get,
  {}
)

// const {
//   execute, pending, reset, error: mutationError
// } = useConvexMutation(api.brands.create)

</script>

<template>
  <main class="page">
    <h2 class="page-title">Shopping Cart</h2>
    
    <!-- <p v-if="error || mutationError">
      {{ error?.message || mutationError?.message }}
    </p> -->

    <section class="products-grid">
      <ProductCard class="product-item" v-for="product in cart.items" :title="product.title"
        :current_price="product.price" :sku="product.sku" :key="product.sku" :image="airpodsMaxImage" wide />
    </section>

  </main>
</template>

<style scoped>
.page {
  flex: 1;
  padding: 40px 17px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.page-title {
  font-size: 24px;
  line-height: 32px;
}

.products-grid {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
</style>
