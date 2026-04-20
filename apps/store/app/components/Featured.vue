<script setup lang="ts">
    import { Button } from '@repo/ui'
    import airPodsImage from '~/assets/images/products/airpods_max.png'

    const products = [
        { 
            title: 'Apple AirPods Max', 
            description: 'Computational audio. Listen, it\'s powerful', 
            image: airPodsImage 
        },
        { 
            title: 'Apple Vision Pro', 
            description: 'An immersive way to experience entertainment', 
            image: airPodsImage 
        },
        { 
            title: 'Playstation 5', 
            description: 'Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.', 
            image: airPodsImage 
        },
        { 
            title: 'Macbook Air', 
            description: 'The new 15‑inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.', 
            image: airPodsImage 
        }
    ]
</script>

<template>
    <article class="featured">
        <section class="featured-product" v-for="product in products">
            <img class="product-image" :src="product.image" :alt="product.title" />
            <h3 class="product-title">{{ product.title }}</h3>
            <p class="product-description">{{ product.description }}</p>
        </section>
    </article>
</template>

<style scoped>
    .featured {
        display: flex;
        flex-direction: column;
    }
    .featured-product {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
    .product-image {
        width: 80%;
        height: auto;
    }
</style>