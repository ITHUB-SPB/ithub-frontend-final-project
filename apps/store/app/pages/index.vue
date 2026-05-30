<script lang="ts" setup>
import { ProductCard } from "@repo/ui";
import Featured from "~/components/Featured.vue";
import { useCartLocal } from "~/stores/cartLocal";
import { useCart } from "~/stores/cart";

const { loggedIn } = useUserSession();

const cart = loggedIn ? useCart() : useCartLocal();

const { data: products, execute: refetch } = await useFetch("/api/products", {
  query: {
    limit: 8,
    offset: 0,
  },
});

const buyNow = async (product: Product) => {
  await cart.addProduct({
    id: product.id,
    currentPrice: product.currentPrice,
    title: product.title,
    quantity: 1,
  });

  await refetch();
};
</script>

<template>
  <main class="page">
    <Cta />
    <BrowseByCategory />
    <Featured />

    <section class="products-grid" v-if="products">
      <ProductCard
        class="product-item"
        v-for="product in products.items"
        :key="product.id"
        :title="product.title"
        :currentPrice="product.currentPrice"
        :id="product.id"
        :inCart="cart.hasProduct(product.id)"
        :wide="false"
        @buy-now="buyNow(product)"
        @go-to-cart="navigateTo('/cart')"
      />
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
