<script setup lang="ts">
import "~/assets/css/global.css"
import { Header, Footer } from '@repo/ui'

import { useCartLocal } from "./stores/cartLocal";
import { useCart } from "./stores/cart";

const { loggedIn, clear, session } = useUserSession()

const user = session.value?.user as string;

const cart = loggedIn ? useCart() : useCartLocal()

if ('fetch' in cart && user) {
    await cart.fetch(user)
}

const cartQuantity = computed(() => {
    return cart.items.length ?? 0
})

const { fullPath } = useRoute()

const handleLogout = async () => {
    await clear()
    await navigateTo(fullPath)
}
</script>

<template>
    <Header :cart-quantity="cartQuantity" :logged-in="loggedIn" @cart-click="navigateTo('/cart')"
        @favorites-click="navigateTo('/favorites')" @index-click="navigateTo('/')" @logout-click="handleLogout()"
        @login-click="navigateTo('/login')" />
    <NuxtPage />
    <Footer />
</template>