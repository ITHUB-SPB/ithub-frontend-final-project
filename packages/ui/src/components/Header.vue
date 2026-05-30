<script lang="ts" setup>
import Logo from "./Logo.vue";
import Field from "./Field.vue";
import Icon from "./Icon.vue";
import Button from "./Button.vue";

const fieldStyles: Partial<CSSStyleDeclaration> = {
  width: "372px",
  border: "0px",
  backgroundColor: "#F5F5F5",
};

const emit = defineEmits<{
  (event: "createAccount"): void;
  (event: "loginClick"): void;
  (event: "logoutClick"): void;
  (event: "cartClick"): void;
  (event: "favoritesClick"): void;
  (event: "indexClick"): void;
}>();

const props = defineProps<{
  loggedIn: boolean;
  cartQuantity: number;
}>();
</script>

<template>
  <header>
    <Logo class="brand" color="black" @click="emit('indexClick')" />
    <Field placeholder="Search" :style="fieldStyles">
      <template #icon-left>
        <Icon variant="search" />
      </template>
    </Field>
    <div class="icons">
      <Icon
        v-if="props.loggedIn"
        class="favorites"
        variant="favorites"
        @click="emit('favoritesClick')"
      />
      <section class="cart-wrapper" :class="{ 'cart-wrapper-empty': !props.cartQuantity }">
        <Icon variant="cart" @click="emit('cartClick')" />
        <span v-if="props.cartQuantity > 0" class="cart-label">{{ props.cartQuantity }}</span>
      </section>

      <Button v-if="!props.loggedIn" label="Login" @click="emit('loginClick')" />
      <Button v-else label="Logout" @click="emit('logoutClick')" />
    </div>
    <Icon variant="burger" class="burger" />
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 16px 200px 15px 160px;
  font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
}

.icons {
  display: flex;
  gap: 24px;
  align-items: center;
}

.icons > button {
  height: 32px;
  padding: 0 8px;
}

.burger {
  display: none;
}

.brand,
.favorites {
  cursor: pointer;
  user-select: none;
}

.cart-wrapper {
  position: relative;
  cursor: pointer;
  user-select: none;
  pointer-events: all;
  opacity: 1;
}

.cart-wrapper-empty {
  opacity: 0.6;
  cursor: default;
  pointer-events: none;
}

.cart-label {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: khaki;
  color: black;
  text-align: center;
  font-size: 12px;
  line-height: 16px;
  font-weight: bold;
}

@media (max-width: 600px) {
  header {
    padding: 24px 16px;
  }

  .icons {
    margin-left: auto;
    margin-right: 24px;
  }

  .input,
  .wrapper {
    display: none;
  }

  .burger {
    display: flex;
  }
}
</style>
