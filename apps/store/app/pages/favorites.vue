<script lang="ts" setup>
import { ProductCard } from "@repo/ui";

import airpodsImage from "~/assets/images/products/airpods_max.png";
import appleWatchImage from "~/assets/images/products/apple_watch.png";

definePageMeta({
  middleware: ["authenticated"],
});

// const { data: products, error } = await useConvexQuery(
//   api.products.get,
//   {}
// )

const products = [
  {
    id: 1,
    title: "AirPods Max Silver",
    image: airpodsImage,
  },
  {
    id: 2,
    title: "Apple Watch Series 9 GPS 41mm Starlight Aluminium",
    image: appleWatchImage,
  },
];

const error = null;
</script>

<template>
  <main class="page">
    <h2 class="page-title">Favorite</h2>
    <p v-if="!products?.length">Здесь пока нет товаров...</p>
    <div v-if="!error">
      <section class="products-grid">
        <ProductCard
          class="product-item"
          v-for="product in products"
          :key="product.id"
          :title="product.title"
          :id="product.id"
          :image="product.image"
          wide
        />
      </section>
    </div>
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
