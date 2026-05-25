<script lang="ts" setup>
import { ProductCard } from '@repo/ui'

import { useCartLocal } from '~/stores/cartLocal';
import { useCart } from '~/stores/cart';

import airpodsMaxImage from '~/assets/images/products/airpods_max.png'

const { user, loggedIn } = useUserSession()

const cart = loggedIn ? useCart() : useCartLocal()

// TODO уточнять список интересующих продуктов

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
        :currentPrice="product.currentPrice" :id="product.id" :key="product.id" :image="airpodsMaxImage" wide />
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
