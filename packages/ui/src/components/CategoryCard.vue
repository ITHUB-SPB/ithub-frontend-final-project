<script setup lang="ts">
    import Icon from './Icon.vue';
</script>

<template>
    <article class="category-card">
        <Icon variant="favorites" class="category-icon" />
        <h5 class="category-title">Tablets</h5>
    </article>
</template>

<style scoped>
    .category-card {
        background-color: rgb(246, 246, 246);
        border-radius: 9px;
        width: 200px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        justify-content: center;
        align-items: center;
        padding: 24px 16px;
    }

    .category-title {
        text-align: center;
        font-size: 16px;
        line-height: 24px;
    }

    .category-icon {
        /* align-self: flex-end; */
        cursor: pointer;
    }
</style>