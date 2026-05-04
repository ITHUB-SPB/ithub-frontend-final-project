<script setup lang="ts">
    import { ref, computed } from 'vue';

    const props = defineProps<{
        quantity: number
        price: number
        onDelete: () => void
    }>()

    const count = ref(props.quantity)

    const increment = () => count.value++
    const decrement = () => count.value--

    const priceUpdate = computed(() => {
        return props.price * count.value
    })
</script>

<template>
    <section class="cart-wrapper">
        <div class="cart-counter">
            <button class="cart-decrement" @click="decrement" :disabled="count == 1">-</button>
            <input type="number" class="cart-quantity" v-model="count">
            <button class="cart-increment" @click="increment" >+</button>
        </div>
        <span class="cart-price">${{ priceUpdate }}</span>
        <button @click="props.onDelete" class="cart-delete">x</button>
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

    


<!-- updateActivePage: (pageNumber: number) => void; -->