<script setup lang="ts">
import { m } from 'vue-router/dist/index-BzEKChPW.js'
import image1Src from '~/assets/images/products/airpods_max.png'
import image2Src from '~/assets/images/products/airpods_max.png'
import image3Src from '~/assets/images/products/apple_watch.png'
import image4Src from '~/assets/images/products/apple_watch.png'

function handleSlider(ix: number) {
    selectedImageIx.value = ix
}

const images = [
    image1Src, image2Src, image3Src, image4Src
]

const selectedImageIx = ref(0)

const product = {
    brand: 'Apple',
    category: 'phones',
    current_price: 1399,
    raw_price: 1499,
    title: 'Apple iPhone 14 Pro Max',
    description: "Just as a book is judged by its cover, the first thing you notice when you pick up a modern smartphone is the display. Nothing surprising, because advanced technologies allow you to practically level the display frames and cutouts for the front camera and speaker, leaving no room for bold design solutions. And how good that in such realities Apple everything is fine with displays. Both critics and mass consumers always praise the quality of the picture provided by the products of the Californian brand. And last year's 6.7-inch Retina panels, which had ProMotion, caused real admiration for many.",
    characteristics: {
        screenSize: {
            value: 6.7,
            measure: 'in',
        },
        cpu: {
            value: 'Apple A16 Bionic',
            measure: null,
        },
        cpuCores: {
            value: 6,
            measure: null,
        },
        mainCamera: {
            value: 12,
            measure: 'MP',
        },
        frontCamera: {
            value: 12,
            measure: 'MP',
        },
        batteryCapacity: {
            value: 4323,
            measure: 'mAh',
        },
    }
}

const mainCharacteristics = {
    phones: [
        { 
            title: 'screenSize',
            description: 'Screen size'
        },
        {
            title: 'cpu',
            description: 'CPU'
        },
        {
            title: 'cpuCores',
            description: 'Number of Cores'
        },
        {
            title: 'mainCamera',
            description: 'Main camera'
        },
        {
            title: 'frontCamera',
            description: 'Front-camera'
        },
        {
            title: 'batteryCapacity',
            description: 'Battery capacity'
        },
    ],
    watches: []
}

</script>

<template>
    <main class="page">
        <section class="slider">
            <img class="product-image product-image--main" :src="images[selectedImageIx]" />
            <div class="slider-thumbnails">
                <button class="slider-button" v-for="(imageSrc, ix) in images" @click="handleSlider(ix)">
                    <img class="product-image" :class="{ 'product-image--active': ix !== selectedImageIx }"
                        :src="imageSrc" />
                </button>
            </div>
        </section>

        <h2 class="product-title">{{ product.title }}</h2>
        <section class="prices">
            <span class="price price--current">{{  product.current_price }}</span>
            <span class="price price--raw">{{ product.raw_price }}</span>
        </section>
        <section class="characteristics">
            <section v-for="item in mainCharacteristics[product.category]" class="characteristic">
                <p class="characteristic-description">{{ item.description }}</p>
                <p class="characteristic-value">
                    {{ product.characteristics[item.title].value }} 
                    {{ product.characteristics[item.title].measure }}
                </p>
            </section>
        </section>
    </main>
</template>

<style scoped>
.page {
    flex: 1;
}

.slider {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    gap: 30px;
}

.product-image {
    height: 100%;
    width: auto;
    object-fit: contain;
    transition: all ease 0.3s;
    pointer-events: none;
}

.product-image--active {
    filter: opacity(0.4);
    pointer-events: all;
    cursor: pointer;
}

.product-image--main {
    max-height: 330px;
    width: 100%;
}

.slider-thumbnails {
    display: flex;
    justify-content: space-evenly;
    height: 66px;
}

.slider-button {
    appearance: none;
    border: 0;
    outline: 0;
    background-color: transparent;
}
</style>