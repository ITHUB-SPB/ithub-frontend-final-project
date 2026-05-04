<script lang="ts" setup>
import { ProductCard } from '@repo/ui';
import { api } from '@repo/convex/api'
import airpodsImage from '~/assets/images/products/airpods_max.png'
import appleWatchImage from '~/assets/images/products/airpods_watch.png'


// const { data: products, error } = await useConvexQuery(
//   api.products.get, 
//   {}
// )

const product = [
  {
    title: 'AirPods Max Silver',
    sku: '#53459358345',
    image: airpodsImage
  },
  {
    _id: 'saadoiq398',
    title: 'Apple Watch Series 9 GPS 41mm Starlight Aluminium',
    sku: '#53459358345',
    image: appleWatchImage
  }
]

const error = null

</script>

<template>
    <main class="page">
    <h2 class="page-title">Favorite</h2>
  <p v-if="!products?.length">
    Здесь пока нет товаров...
  </p>
  <div v-if="!error">
    <section class="products-grid">
      <ProductCard 
        class="product-item" 
        v-for="product in products" 
        :key="product._id" 
        :title="product.title" 
        :current_price="product.current_price" 
        :sku="product.sku"
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
