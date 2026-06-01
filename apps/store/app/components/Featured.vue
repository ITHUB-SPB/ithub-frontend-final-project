<script setup lang="ts">
import { Button } from "@repo/ui";
import airPodsImage from "~/assets/images/products/airpods_max.png";
import appleVisionProImage from "~/assets/images/products/apple_vision_pro.png";
import macBookAirImage from "~/assets/images/products/macbook_air.png";
import playstationImage from "~/assets/images/products/playstation_5.png";

const products = [
  {
    title: "Apple AirPods Max",
    description: "Computational audio. Listen, it's powerful",
    image: airPodsImage,
    background: "#EDEDED",
    color: "black",
  },
  {
    title: "Apple Vision Pro",
    description: "An immersive way to experience entertainment",
    image: appleVisionProImage,
    background: "#353535",
    color: "white",
  },
  {
    title: "Playstation 5",
    description:
      "Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.",
    image: playstationImage,
    background: "#FFF",
    color: "black",
  },
  {
    title: "Macbook Air",
    description:
      "The new 15‑inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.",
    image: macBookAirImage,
    background: "#EDEDED",
    color: "black",
  },
];
</script>

<template>
  <article class="featured">
    <section
      :style="{ background: product.background }"
      class="featured-product"
      v-for="product in products"
    >
      <img class="product-image" :src="product.image" :alt="product.title" />
      <h3 class="product-title" :style="{ color: product.color }">{{ product.title }}</h3>
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
  padding: 40px 16px;
  gap: 8px;
}
.product-image {
  height: auto;
  max-height: 200px;
  max-width: 80%;
}
.product-title {
  font-size: 34px;
  line-height: 40px;
}
.product-description {
  color: #909090;
  font-size: 16px;
}

@media screen and (min-width: 1200px) {
  .featured {
    display: grid;
    grid-template-columns: 1fr 1fr 2fr;
    grid-template-rows: 328px 328px;
  }
  .featured-product {
    
  }
  .featured-product:nth-child(1) {
    grid-row-start: 2;
  }
  .featured-product:nth-child(2) {
    grid-row-start: 2;
  }
  .featured-product:nth-child(3) {
    grid-row-start: 1;
    grid-column-start: 1;
    grid-column-end: 3;
  }
  .featured-product:nth-child(4) {
    grid-row-start: 1;
    grid-row-end: 3;
  }
}
</style>
