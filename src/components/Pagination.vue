<script setup lang="ts">
import { computed } from 'vue';
import Icon from './Icon.vue';

const props = defineProps<{
    /**
     * Page quantity
     */
    pageQuantity: number;
    /**
     * Index of active page
     */
    activePage: number;
    /**
     * Function to update active page
     */
    updateActivePage: (pageNumber: number) => void;
}>()

const pages = computed(() => Array.from({
    length: props.pageQuantity
}, (_, index) => index + 1))

</script>

<template>
<nav>
    <button class="arrow" v-show="props.activePage > 1" @click="updateActivePage(Math.max(1, props.activePage - 1))">
        <Icon variant="arrow" />
    </button>
    
    <template v-for="pageNumber in pages">
        <button @click="updateActivePage(pageNumber)" v-if="props.activePage === pageNumber" class="button button--active">{{ pageNumber }}</button>
        <button @click="updateActivePage(pageNumber)" v-else class="button">{{ pageNumber }}</button>
    </template>

    <button class="arrow" v-show="props.activePage < props.pageQuantity" @click="updateActivePage(Math.min(props.pageQuantity, props.activePage + 1))">
        <Icon variant="arrow" />
    </button>
</nav>
</template>

<style scoped>
nav {
    display: flex;
    gap: 8px;
}

.button {
    font-size: 16px;
    line-height: 24px;
    font-family: inherit;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    letter-spacing: 0.03;
    border-radius: 5px;
    background-color: rgb(246,246,246);
    color: black;
    border: 0;
    cursor: pointer;
}

.button--active {
    background-color: black;
    color: white;
    pointer-events: none;
    cursor: default;
}

.arrow {
    background-color: transparent;
    border: 0;
    cursor: pointer
}

.arrow:first-of-type {
    transform: rotate(180deg);
}

</style>