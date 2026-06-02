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
      <button class="cart-decrement" @click="emit('decrement')" :disabled="count == 1">-</button>
      <span class="cart-quantity">{{ props.quantity }}</span>
      <button class="cart-increment" @click="emit('increment')">+</button>
    </div>
    <span class="cart-price">{{ priceUpdate }}</span>
    <button @click="emit('delete')" class="cart-delete">x</button>
  </section>
</template>

<style scoped>
.cart-wrapper {
  display: flex;
}

.cart-quantity {
  max-width: 40px;
}
</style>