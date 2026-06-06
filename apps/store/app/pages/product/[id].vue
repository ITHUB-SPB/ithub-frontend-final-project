<script setup lang="ts">
import image1Src from "~/assets/images/products/airpods_max.png";
import image2Src from "~/assets/images/products/airpods_max.png";
import image3Src from "~/assets/images/products/apple_watch.png";
import image4Src from "~/assets/images/products/apple_watch.png";

import { DetailCard } from "@repo/ui";

function handleSlider(ix: number) {
  selectedImageIx.value = ix;
}

const route = useRoute()

const { data: product } = useFetch('/api/product', {
  query: {
    productId: route.params.id
  }
})

console.log(product)

const images = [image1Src, image2Src, image3Src, image4Src];

const selectedImageIx = ref(0);

// const product = {
//   brand: "Apple",
//   category: "phones",
//   currentPrice: 1399,
//   rawPrice: 1499,
//   title: "Apple iPhone 14 Pro Max",
//   description:
//     "Just as a book is judged by its cover, the first thing you notice when you pick up a modern smartphone is the display. Nothing surprising, because advanced technologies allow you to practically level the display frames and cutouts for the front camera and speaker, leaving no room for bold design solutions. And how good that in such realities Apple everything is fine with displays. Both critics and mass consumers always praise the quality of the picture provided by the products of the Californian brand. And last year's 6.7-inch Retina panels, which had ProMotion, caused real admiration for many.",
//   characteristics: {
//     screenSize: {
//       value: 6.7,
//       measure: "in",
//     },
//     cpu: {
//       value: "Apple A16 Bionic",
//       measure: null,
//     },
//     cpuCores: {
//       value: 6,
//       measure: null,
//     },
//     mainCamera: {
//       value: 12,
//       measure: "MP",
//     },
//     frontCamera: {
//       value: 12,
//       measure: "MP",
//     },
//     batteryCapacity: {
//       value: 4323,
//       measure: "mAh",
//     },
//     screenResolution: {
//       value: "2796x1290",
//       measure: "px",
//     },
//     pixelDensity: {
//       value: 460,
//       measure: "ppi",
//     },
//     screenType: {
//       value: "OLED",
//       measure: null,
//     },
//     weight: {
//       value: 240,
//       measure: "g",
//     },
//   },
// } as const;

const mainCharacteristics = {
  phones: [
    {
      title: "screenSize",
      description: "Screen size",
    },
    {
      title: "cpu",
      description: "CPU",
    },
    {
      title: "cpuCores",
      description: "Number of Cores",
    },
    {
      title: "mainCamera",
      description: "Main camera",
    },
    {
      title: "frontCamera",
      description: "Front-camera",
    },
    {
      title: "batteryCapacity",
      description: "Battery capacity",
    },
  ],
  watches: [],
} as const;

const additionalCharacteristics = {
  phones: [
    {
      title: "screenResolution",
      description: "The screen resolution",
    },
    {
      title: "pixelDensity",
      description: "The pixel density",
    },
    {
      title: "screenType",
      description: "Screen type",
    },
    {
      title: "weight",
      description: "Weight",
    },
  ],
  watches: [],
} as const;
</script>

<template>
  <main class="page">
    <section class="slider">
      <img class="product-image product-image--main" :src="images[selectedImageIx]" />
      <div class="slider-thumbnails">
        <button class="slider-button" v-for="(imageSrc, ix) in images" @click="handleSlider(ix)">
          <img class="product-image" :class="{ 'product-image--active': ix !== selectedImageIx }" :src="imageSrc" />
        </button>
      </div>
    </section>

    <h2 class="product-title">{{ product.title }}</h2>
    <section class="prices">
      <span class="price price--current">{{ product.currentPrice }}</span>
      <span class="price price--raw">{{ product.rawPrice }}</span>
    </section>

    <section class="characteristics">
      <DetailCard v-for="item in mainCharacteristics[product.category]" :variant="item.title"
        :value="product.characteristics[item.title].value" class="characteristic" />
    </section>

    <details class="details">
      <summary class="details-summary">
        <h3 class="details-title">Details</h3>
      </summary>
      <div class="details-description" v-html="product.description"></div>
      <!-- перебрать дополнительные характеристики по аналогии с основными выше -->
      <section v-for="item in additionalCharacteristics[product.category]" class="additional-characteristic">
        <p class="additional-characteristic-description">{{ item.description }}</p>
        <p class="additional-characteristic-value">
          {{ product.characteristics[item.title].value }}
          {{ product.characteristics[item.title].measure }}
        </p>
      </section>
    </details>
  </main>
</template>

<style scoped>
.page {
  flex: 1;
  padding: 16px;
}

.slider {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 30px;
}

.characteristics {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

@media (min-width: 600px) {
  .characteristics {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
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
