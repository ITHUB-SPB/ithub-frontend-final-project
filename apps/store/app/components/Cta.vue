<script setup lang="ts">
    import { Button } from '@repo/ui'
    import ctaImage from '~/assets/images/cta.png'
</script>

<template>
    <article class="block">
        <p class="slogan">Pro.Beyond.</p>
        <h3 class="heading">IPhone 14 Pro</h3>
        <p class="summary">Created to change everything for the better. For everyone</p>
        <Button class="button" label="Shop Now" />
        <img class="image" :src="ctaImage" alt="iphone 14 pro image"/>
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

    .image {
        width: 321px;
        height: auto;
    }

    .slogan, .heading, .summary {
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

    .slogan, .summary {
        color: rgb(144,144,144);
    }

    .button {
        margin-bottom: 48px;
        min-height: 56px;
        font-size: 16px;
        font-family: 'Abel', sans-serif;
    }

</style>