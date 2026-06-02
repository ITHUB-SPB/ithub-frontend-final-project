<script setup lang="ts">
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
    <section :style="{ background: product.background }" class="featured-product" v-for="product in products">
      <div class="image-wrapper">
        <img class="product-image" :src="product.image" :alt="product.title" />
      </div>
      <div class="featured-product-text">
        <h3 :style="{ color: product.color }" class="product-title">{{ product.title }}</h3>
        <p class="product-description">{{ product.description }}</p>
      </div>
    </section>
  </article>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Abel&display=swap');

* {
  font-family: Abel, sans-serif;
}

.featured {
  display: flex;
  flex-direction: column;
}

.featured-product {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 16px 40px;
  gap: 8px;
}

.product-title {
  font-size: 34px;
  line-height: 40px;
}

.product-description {
  color: #909090;
  font-size: 16px;
}

.product-image {
  max-height: 200px;
  max-width: 80%;
  height: auto;
}

@media screen and (min-width: 1200px) {
  .featured {
    display: grid;
    grid-template-columns: 1fr 1fr 2fr;
    grid-template-rows: 328px 328px;
  }

  .product-image {
    max-height: 272px;
    max-width: 100%;
    height: auto;
  }

  .featured-product {
    display: flex;
    flex-direction: row;
    padding-left: 0;
  }

  .featured-product-text {
    max-width: 339px;
    text-align: left;
  }

  .featured-product:nth-child(1) {
    grid-row-start: 2;
  }

  .featured-product:nth-child(1) .image-wrapper {
    height: 100%;
    width: 104px;
  }

  .featured-product:nth-child(1) .featured-product-text {
    max-width: 160px;
    padding: 0 20px;
  }

  .featured-product:nth-child(1) .product-image {
    height: 100%;
    object-fit: cover;
    object-position: right;
  }

  .featured-product:nth-child(2) .image-wrapper {
    height: 100%;
    width: 300px;
  }

  .featured-product:nth-child(2) .product-image {
    height: 100%;
    object-fit: cover;
    object-position: right;
  }

  .featured-product:nth-child(3) {
    grid-row-start: 1;
    grid-column-start: 1;
    grid-column-end: 3;
  }

  .featured-product:nth-child(3) .image-wrapper {
    height: 343px;
    width: 360px;
  }

  .featured-product:nth-child(3) .product-image {
    height: 100%;
    width: 100%;
  }

  .featured-product:nth-child(3) .featured-product-text {
    max-width: 338px;
    padding: 0 20px;
  }

  .featured-product:nth-child(4) {
    grid-row-start: 1;
    grid-row-end: 3;
    align-items: center;
    padding-left: 56px;
    padding-right: 0;
  }

  .featured-product:nth-child(4) .image-wrapper {
    height: 502px;
    width: 300px;
    order: 2;
    display: flex;
    align-items: center;
  }

  .featured-product:nth-child(4) .product-image {
    height: 100%;
    object-fit: cover;
    object-position: left;
  }
}
</style>