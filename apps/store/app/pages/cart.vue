<script lang="ts" setup>
import { ProductCard, CartPrice } from "@repo/ui";

import { useCartLocal } from "~/stores/cartLocal";
import { useCart } from "~/stores/cart";

import airpodsMaxImage from "~/assets/images/products/airpods_max.png";

const { loggedIn } = useUserSession();

const cart = loggedIn ? useCart() : useCartLocal();
</script>

<template>
  <main class="page">
    <h2 class="page-title">Shopping Cart</h2>

    <section class="products-grid" v-if="cart?.items?.length">
      <div class="product-wrapper" v-for="product in cart.items">
        <ProductCard class="product-item" :title="product.title" :currentPrice="product.currentPrice" :id="product.id"
          :key="product.id" :image="airpodsMaxImage" wide>
          <CartPrice :key="product.id" :quantity="product.quantity" :currentPrice="product.currentPrice" @decrement="cart.changeQuantity({
            ...product,
            quantity: product.quantity - 1
          })" @increment="cart.changeQuantity({
            ...product,
            quantity: product.quantity + 1
          })" @delete="cart.changeQuantity({
            ...product,
            quantity: 0
          })" />
        </ProductCard>
      </div>
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
