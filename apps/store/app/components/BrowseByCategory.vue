<script setup lang="ts">
    import { CategoryCard, Icon } from '@repo/ui';

    const categoryNames = [
        "phones", "smart watches", "cameras", "headphones", "computers", "gaming", "favorites", "discounts"
    ]
</script>

<template>
    <article class="wrapper">
        <header class="categories-header">
            <h5 class="categories-title">Browse By Category</h5>
            <Icon variant="arrow" class="arrow-left" />
            <Icon variant="arrow" class="arrow-right" />
        </header>
        <section class="categories">
            <CategoryCard v-for="name in categoryNames" :name="name" />
        </section>
    </article>
</template>

<style scoped>
    .wrapper {
        padding: 64px 16px;
    }
    .categories-header {
        display: flex;
        align-items: center;
        gap: 16px;
    }
    .arrow-left, .arrow-right {
        cursor: pointer;
    }
    .arrow-left {
        margin-left: auto;
        transform: rotate(180deg);
    }
    .categories {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: repeat(3, 128px);
        gap: 16px;
    }
    .category-card:nth-child(7),
    .category-card:nth-child(8) {
        display: none;
    }
</style>

<style>
    .category-title {
        text-transform: capitalize;
    }
</style>