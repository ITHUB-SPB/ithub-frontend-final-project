<script lang="ts" setup>
import Logo from "./Logo.vue";
import Field from "./Field.vue";
import Icon from "./Icon.vue";

const fieldStyles: Partial<CSSStyleDeclaration> = {
  width: "372px",
  border: "0px",
  backgroundColor: "#F5F5F5",
};

defineEmits<{
  (event: "createAccount"): void;
  (event: "login"): void;
  (event: "logout"): void;
}>();
</script>

<template>
  <header>
    <Logo color="black"/>
    <Field placeholder="Search" :style="fieldStyles">
      <template #icon-left>
        <Icon variant="search" />
      </template>
    </Field>
    <div class="icons">
      <Icon variant="favorites" />
      <Icon variant="cart" />
    </div>
    <Icon variant="burger" class="burger"/>
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
}
.icons {
  display: flex;
  gap: 24px;
}

.burger {
  display: none;
}


@media (max-width: 600px) {
  header {
    padding: 0;
  }

  .icons,
  .input {
    display: none;
  }

  .burger {
    display: flex;
  }
}
</style>
