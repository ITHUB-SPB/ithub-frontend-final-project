<script setup lang="ts">
import { computedAsync } from "@vueuse/core";

import "~/assets/css/global.css";
import { Header, Footer } from "@repo/ui";

import { useCartLocal } from "./stores/cartLocal";
import { useCart } from "./stores/cart";

const { loggedIn, clear, user } = useUserSession();

const cart = loggedIn ? useCart() : useCartLocal();

const cartQuantity = computedAsync(async () => {
  if ("fetch" in cart) {
    await cart.fetch();
  }

  return cart.items.length;
}, 0);

const { fullPath } = useRoute();

const handleLogout = async () => {
  await clear();
  await navigateTo(fullPath);
};
</script>

<template>
  <Header
    :cart-quantity="cartQuantity"
    :logged-in="loggedIn"
    @cart-click="navigateTo('/cart')"
    @favorites-click="navigateTo('/favorites')"
    @index-click="navigateTo('/')"
    @logout-click="handleLogout()"
    @login-click="navigateTo('/login')"
  />
  <NuxtPage />
  <Footer />
</template>
