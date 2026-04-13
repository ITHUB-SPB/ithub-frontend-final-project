<script setup lang="ts">
const props = defineProps<{
    color: "white" | "black"
}>()

import blackLogo from '../assets/logo/black.svg'
import whiteLogo from '../assets/logo/white.svg'

</script>

<template>
    <img 
        :src="props.color === 'black' ? blackLogo : whiteLogo" 
        alt="cyber" 
    />
</template>

<style scoped></style>