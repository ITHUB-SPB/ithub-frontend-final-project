<script setup lang="ts">
import Icon from './Icon.vue';
import Button from './Button.vue';
import productImage from '../assets/images/iphone14.png'

type StandartProps = {
    title: string
    image?: string,
    in_cart: boolean,
    current_price: number,
    wide: false,
}

type WideProps = {
    title: string,
    image?: string,
    in_cart?: boolean,
    current_price?: number,
    sku: string,
    wide: true,
}

const props = defineProps<StandartProps | WideProps>()
const emit = defineEmits(['buyNow', 'favorite'])

</script>

<template>
    <article class="product-card" :class="{ 'card-wide': props.wide }">
        <button v-if="!props.wide" @click="emit('favorite')">
            <Icon variant="favorites" class="product-icon" />
        </button>

        <img class="product-image" :class="{ 'image-wide': props.wide }" :src="props.image ?? productImage"
            alt="iphone 14" />

        <h3 class="product-title" :class="{ 'title-wide': props.wide }">{{ props.title }} </h3>

        <span v-if="!props.wide" class="product-price">${{ props.current_price }}</span>
        <span v-else="props.wide" class="product-sku">{{ props.sku }}</span>

        <Button v-if="props.in_cart" small label="Go to Cart" />
        <Button v-else-if="!props.wide" small label="Buy Now" @click="emit('buyNow')" />
    </article>
</template>

<style scoped>
.product-card {
    box-sizing: border-box;
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

.card-wide {
    background-color: transparent;
    flex-wrap: wrap;
    padding: 16px 0;
    height: 122px;
    gap: 8px;
    align-content: start;
    align-items: start;
    width: max(100%, 324px);
}

.image-wide {
    max-width: 90px;
    max-height: 90px;
    min-width: 90px;
    min-height: 90px;
}

.product-image {
    max-width: 160px;
    max-height: 160px;
    object-fit: contain;
}

.product-title {
    margin-block: 0;
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

.title-wide {
    width: calc(100% - 8px - 90px);
    min-height: fit-content;
    text-align: left;
}
</style>