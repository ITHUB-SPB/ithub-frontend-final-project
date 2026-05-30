<script lang="ts" setup>
import { ProductCard } from "@repo/ui";

import { useCartLocal } from "~/stores/cartLocal";
import { useCart } from "~/stores/cart";

import airpodsMaxImage from "~/assets/images/products/airpods_max.png";

const { user, loggedIn } = useUserSession();

const cart = loggedIn ? useCart() : useCartLocal();
</script>

<template>
  <main class="page">
    <h2 class="page-title">Shopping Cart</h2>

    <section class="products-grid" v-if="cart?.items?.length">
      <ProductCard
        class="product-item"
        v-for="product in cart.items"
        :title="product.title"
        :currentPrice="product.currentPrice"
        :id="product.id"
        :key="product.id"
        :image="airpodsMaxImage"
        wide
      />
    </section>

    <section v-else>
      <p>You don't have any products in cart yet...</p>
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
