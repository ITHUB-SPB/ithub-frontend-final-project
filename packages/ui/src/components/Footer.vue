<script lang="ts" setup>
import Logo from "./Logo.vue";
import Icon from "./Icon.vue";

const fieldStyles: Partial<CSSStyleDeclaration> = {
  width: "372px",
  border: "0px",
  backgroundColor: "#F5F5F5",
};
</script>

<template>
  <footer>
    <div class="links">
      <Logo color="black"/>
      <p class="about">We are a residential interior design firm located in Portland. Our boutique-studio offers more than</p>
    </div>
    
    <div class="icons">
      <Icon variant="twitter" class="footer-icon" />
      <Icon variant="twitter" />
      <Icon variant="twitter" />
      <Icon variant="twitter" />
    </div>
  </footer>
</template>

<style scoped>
footer {
  background-color: #181313;
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 48px 32px;
  font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #cfcfcf;
}

.icons {
  display: flex;
  gap: 24px;
}

.footer-icon {
  height: 24px;
  width: 24px;
}

@media (min-width: 600px) {
  footer {
    /* TODO */
    padding: 24px 16px;
  }
}
</style>
