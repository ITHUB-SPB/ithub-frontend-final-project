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
    .arrow-left, .arrow-right {
        cursor: pointer;
    }
    .arrow-left {
        transform: rotate(180deg);
    }
</style>