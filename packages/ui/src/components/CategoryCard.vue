<script setup lang="ts">
    import Icon, { type IconVariant } from './Icon.vue';

    type CategoryName = "phones" | "smart watches" | "cameras" | "headphones" | "computers" | "gaming" | "favorites" | "discounts"

    const props = defineProps<{
        name: CategoryName
    }>()

    const icons: { [key: string] : IconVariant } = {
        phones: "phones",
        "smart watches": "smartWatches",
        cameras: "cameras",
        headphones: "headphonesLarge",
        computers: "computersLarge",
        gaming: "gamingLarge",
        favorites: "favorites",
        discounts: "favorites"
    } as const;
</script>

<template>
    <article class="category-card">
        <Icon :variant="icons[props.name] ?? 'cart'" class="category-icon" />
        <h5 class="category-title">{{ props.name }}</h5>
    </article>
</template>

<style scoped>
    .category-card {
        background-color: rgb(246, 246, 246);
        border-radius: 9px;
        min-width: 135px;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 16px;
        justify-content: center;
        align-items: center;
        padding: 24px 16px;
    }

    .category-title {
        text-align: center;
        font-size: 16px;
        line-height: 24px;
    }

    .category-icon {
        /* align-self: flex-end; */
        cursor: pointer;
    }
</style>