<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  quantity: number;
  currentPrice: number;
}>();

const emit = defineEmits(['increment', 'decrement', 'delete'])

const priceUpdate = computed(() => {
  return props.currentPrice * props.quantity;
});
</script>

<template>
  <section class="cart-wrapper">
    <div class="cart-counter">
      <button class="cart-button cart-decrement" @click="emit('decrement')" :disabled="props.quantity == 1">-</button>
      <span class="cart-quantity">{{ props.quantity }}</span>
      <button class="cart-button cart-increment" @click="emit('increment')">+</button>
    </div>
    <span class="cart-price">{{ priceUpdate }}</span>
    <button @click="emit('delete')" class="cart-button cart-delete">×</button>
  </section>
</template>

<style scoped>
.cart-wrapper {
  display: flex;
  align-items: center;
  gap: 24px;
}

.cart-counter {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cart-button {
  width: 24px;
  height: 24px;
  background-color: transparent;
  border-color: transparent;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.cart-price {
  font-size: 20px;
  line-height: 32px;
  cursor: default;
}

.cart-quantity {
  max-width: 40px;
  cursor: default;
  height: 32px;
  width: 41px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(217, 217, 217);
  border-radius: 4px;
}
</style>