<script setup lang="ts">
    import Icon from './Icon.vue';
    import Button from './Button.vue';
    import productImage from '../assets/images/iphone14.png'
</script>

<template>
    <article class="product-card">
        <Icon variant="favorites" class="product-icon" />
        <img class="product-image" :src="productImage" alt="iphone 14"/>
        <h3 class="product-title">Apple iPhone 14 Pro Max 128GB Deep Purple (MQ9T3RX/A)</h3>
        <span class="product-price">$1399</span>
        <Button small label="Buy Now" @click="console.log('!')"/>
    </article>
</template>

<style scoped>
    .product-card {
        background-color: rgb(246, 246, 246);
        border-radius: 9px;
        width: 200px;
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
    }

    .product-icon {
        align-self: flex-end;
        cursor: pointer;
    }
</style>