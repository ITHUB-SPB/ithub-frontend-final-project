<script lang="ts" setup>
import { ProductCard } from '@repo/ui';
import { api } from '@repo/convex/api'

const { data: products, error } = await useConvexQuery(
    api.products.get,
    {}
)
</script>

<template>
    <main class="page">
        <h2 class="page-title">Favorite</h2>

        <p v-if="!products?.length">
            Здесь пока нет товаров...
        </p>

        <div v-if="!error">
            <section class="products-grid">
                <ProductCard class="product-item" v-for="product in products" :key="product._id" :title="product.title"
                    :current_price="product.current_price" />
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
    font-weight: 400;
}

.products-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(4, max-content);
    gap: 16px;
    padding: 56px 16px;
}
</style>
