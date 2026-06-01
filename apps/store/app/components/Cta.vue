<script setup lang="ts">
import { Button } from "@repo/ui";
import ctaImage from "~/assets/images/cta.png";
</script>

<template>
  <article class="block">
    <div class="block-content">
      <p class="slogan">Pro.Beyond.</p>
      <h3 class="heading">IPhone 14 Pro</h3>
      <p class="summary">Created to change everything for the better. For everyone</p>
      <Button variant="stroke" class="button" label="Shop Now" />
    </div>
    <div class="image-wrapper">
      <img class="image" :src="ctaImage" alt="iphone 14 pro image" />
    </div>
  </article>
</template>

<style scoped>
.block {
  height: 769px;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 88px 16px 0 16px;
  background-color: rgb(33, 28, 36);
}

.block-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image {
  width: 321px;
  height: auto;
}

.slogan,
.heading,
.summary {
  text-align: center;
}

.slogan,
.heading {
  margin-bottom: 16px;
}

.summary {
  margin-bottom: 32px;
}

.heading {
  color: white;
  font-size: 72px;
}

.slogan,
.summary {
  color: rgb(144, 144, 144);
}

.button {
  margin-bottom: 48px;
  min-height: 56px;
  font-size: 16px;
  font-family: "Abel", sans-serif;
}

@media screen and (min-width: 1200px) {
  .block {
    flex-direction: row;
    justify-content: space-between;
    padding: 0 160px;
  }
  .image-wrapper {
    height: 632px;
    width: 406px;
    align-self: flex-end;
  }
  .image {
    width: 100%;
  }
  .block-content {
    align-items: flex-start;
  }
}
</style>
