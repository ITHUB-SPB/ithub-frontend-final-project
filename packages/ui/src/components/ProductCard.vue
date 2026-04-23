<script setup lang="ts">
    import Icon from './Icon.vue';
    import Button from './Button.vue';
    import productImage from '../assets/images/iphone14.png'

    const props = defineProps<{
        title: string,
        current_price: number
        image?: string;
        handleClick?: () => void
    }>()
</script>

<template>
    <article class="product-card">
        <Icon variant="favorites" class="product-icon" />
        <img class="product-image" :src="props.image ?? productImage" alt="iphone 14"/>
        <h3 class="product-title">{{ props.title }}</h3>
        <span class="product-price">${{ props.current_price }}</span>
        <Button small label="Buy Now" @click="handleClick ?? {}"/>
    </article>
</template>

<style scoped>
    .product-card {
        background-color: rgb(246, 246, 246);
        border-radius: 9px;
        /* max-width: 200px; */
        display: flex;
        flex-direction: column;
        gap: 16px;
        justify-content: center;
        align-items: center;
        padding: 24px 16px;
    }

    .product-image {
        max-width: 160px;
        max-height: 160px;
        object-fit: contain;
    }

    .product-title {
        text-align: center;
        font-size: 16px;
        line-height: 24px;
        min-height: 48px;
        max-height: 48px;
        overflow-y: hidden;
        text-overflow: ellipsis;
    }

    .product-icon {
        align-self: flex-end;
        cursor: pointer;
    }
</style>