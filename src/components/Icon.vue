<script setup lang="ts">
export const props = defineProps<{
    variant: "twitter" | "close" | "toEdit"
}>()

import twitter from '../assets/icons/16px/Twitter.svg'
import close from '../assets/icons/24px/Close.svg'
import toEdit from '../assets/icons/24px/To edit.svg'

const sources = {
    twitter,
    close,
    toEdit
}
</script>

<template>
    <img 
        :src="sources[props.variant]" 
        :alt="props.variant" 
    />
</template>

<style scoped></style>