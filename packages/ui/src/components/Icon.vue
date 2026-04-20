<script setup lang="ts">
export type IconVariant = 
    | "twitter" | "close" | "toEdit" | "burger" | "cameras" | "computers" 
    | "gaming" | "headphones" | "phones" | "smartWatches" | "delivery" 
    | "guaranteed" | "stock" | "battery" | "location" | "shipping" | "favorites" 
    | "cart" | "search" | "computersLarge" | "gamingLarge" | "headphonesLarge" | "arrow"

const props = defineProps<{
    variant: IconVariant
}>()

import twitter from '../assets/icons/16px/Twitter.svg'

import close from '../assets/icons/24px/Close.svg'
import toEdit from '../assets/icons/24px/To edit.svg'
import battery from '../assets/icons/24px/Battery.svg'
import location from '../assets/icons/24px/Location.svg'
import shipping from '../assets/icons/24px/Shipping.svg'
import computers from '../assets/icons/24px/Computers.svg'
import gaming from '../assets/icons/24px/Gaming.svg'
import headphones from '../assets/icons/24px/Headphones.svg'
import arrow from '../assets/icons/24px/Arrow.svg'

import favorites from '../assets/icons/32px/Favorites.svg'
import cart from '../assets/icons/32px/Cart.svg'
import search from '../assets/icons/32px/Search.svg'

import burger from '../assets/icons/40px/Burger.svg'

import cameras from '../assets/icons/48px/Cameras.svg'
import phones from '../assets/icons/48px/Phones.svg'
import computersLarge from '../assets/icons/48px/Computers.svg'
import gamingLarge from '../assets/icons/48px/Gaming.svg'
import headphonesLarge from '../assets/icons/48px/Headphones.svg'
import smartWatches from '../assets/icons/48px/Smart watches.svg'
import delivery from '../assets/icons/56px/Delivery.svg'

import guaranteed from '../assets/icons/56px/Guaranteed.svg'
import stock from '../assets/icons/56px/Stock.svg'


const sources = {
    twitter,
    close,
    toEdit,
    arrow,
    burger,
    cameras,
    computers,
    gaming,
    headphones,
    phones,
    smartWatches,
    delivery,
    guaranteed,
    stock,
    battery,
    location,
    shipping,
    favorites,
    cart,
    search,
    computersLarge,
    gamingLarge,
    headphonesLarge,
}
</script>

<template>
    <img 
        :src="sources[props.variant]" 
        :alt="props.variant" 
    />
</template>

<style scoped></style>