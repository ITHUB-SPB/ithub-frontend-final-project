<script setup lang="ts">
import Icon, { type IconVariant } from "./Icon.vue";

type DetailName =
  | "screenSize"
  | "cpu"
  | "cpuCores"
  | "mainCamera"
  | "frontCamera"
  | "batteryCapacity";

const props = defineProps<{
  variant: DetailName;
  value: string;
}>();

const icons: { [key: string]: IconVariant } = {
  screenSize: "screenSize",
  cpu: "cpu",
  cpuCores: "core",
  mainCamera: "mainCamera",
  frontCamera: "frontCamera",
  batteryCapacity: "battery",
} as const;

const title: { [key: string]: string } = {
  screenSize: "Screen size",
  cpu: "CPU",
  cpuCores: "Number of Cores",
  mainCamera: "Main camera",
  frontCamera: "Front camera",
  batteryCapacity: "Battery capacity",
} as const;
</script>

<template>
  <article class="detail-card">
    <Icon :variant="icons[props.variant] ?? 'cart'" class="detail-icon" />
    <div>
      <h5 class="detail-title">{{ title[props.variant] }}</h5>
      <p class="detail-value">{{ props.value }}</p>
    </div>
  </article>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Abel&display=swap");

* {
  font-family: Abel, sans-serif;
  font-size: 14px;
}

.detail-card {
  background-color: rgb(246, 246, 246);
  border-radius: 7px;
  min-width: 135px;
  max-width: 200px;
  width: 100%;
  display: flex;
  /* flex-direction: column; */
  align-items: center;
}

.detail-title {
  text-align: center;
  line-height: 24px;
  margin: 0;
  color: rgb(170, 170, 170);
  text-align: left;
}

.detail-value {
  margin-block-start: 0;
  margin-block-end: 0;
}

.detail-icon {
  /* align-self: flex-end; */
  cursor: pointer;
  padding: 20px 10px 20px 16px;
}
</style>
