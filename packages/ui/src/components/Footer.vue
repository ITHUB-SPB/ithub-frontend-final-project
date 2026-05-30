<script lang="ts" setup>
import Logo from "./Logo.vue";
import Icon, { type IconVariant } from "./Icon.vue";

const links = {
  services: [
    { text: "Bonus program", link: "/bonus-program" },
    { text: "Gift cards", link: "/gift-card" },
    { text: "Credit and payment", link: "/credit-and-payment" },
    { text: "Service contracts", link: "/service-contracts" },
    { text: "Non-cash account", link: "/non-cash-account" },
    { text: "Payment", link: "/payment" },
  ],
  assistance: [
    { text: "Find an order", link: "/find-order" },
    { text: "Terms of delivery", link: "/delivery-terms" },
    { text: "Exchange and return of goods", link: "/exchange-and-return" },
    { text: "Guarantee", link: "/guarantee" },
    { text: "Frequently asked questions", link: "/frequently-questions" },
    { text: "Terms of use of the site", link: "/site-terms" },
  ],
};

const socialLinks: Array<{ name: IconVariant; link: string }> = [
  { name: "twitter", link: "https://twitter.com" },
  { name: "facebook", link: "https://facebook.com" },
  { name: "tiktok", link: "https://tiktok.com" },
  { name: "instagram", link: "https://instagram.com" },
];

const fieldStyles: Partial<CSSStyleDeclaration> = {
  width: "372px",
  border: "0px",
  backgroundColor: "#F5F5F5",
};
</script>

<template>
  <footer>
    <div class="links">
      <section class="about">
        <Logo color="white" />
        <p class="about">
          We are a residential interior design firm located in Portland. Our boutique-studio offers
          more than
        </p>
      </section>

      <section class="links-services">
        <h5 class="links-heading">Services</h5>
        <ul class="links-list">
          <li class="link-item" v-for="item in links.services">
            <a :href="item.link" class="link">{{ item.text }}</a>
          </li>
        </ul>
      </section>

      <section class="links-assistance">
        <h5 class="links-heading">Assistance to the buyer</h5>
        <ul class="links-list">
          <li class="link-item" v-for="item in links.assistance">
            <a :href="item.link" class="link">{{ item.text }}</a>
          </li>
        </ul>
      </section>
    </div>

    <section class="icons">
      <a v-for="link in socialLinks" :href="link.link">
        <Icon :variant="link.name" class="footer-icon" />
      </a>
    </section>
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
  text-align: center;
}

.icons {
  display: flex;
  gap: 24px;
}

.about {
  font-size: 13px;
}

.footer-icon {
  height: 24px;
  width: 24px;
}

.links-list {
  list-style: none;
  padding-inline-start: 0;
  color: inherit;
  margin-block: 0;
}

.link {
  color: inherit;
  text-decoration: none;
  font-size: 14px;
  line-height: 32px;
  font-family: inherit;
}

.links-heading {
  color: #ffffff;
  font-size: 16px;
  margin-bottom: 8px;
}

@media (min-width: 600px) {
  footer {
    /* TODO */
    padding: 104px 160px;
    text-align: left;
  }

  .icons {
    align-self: self-start;
  }

  .links {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }

  .footer-icon {
    height: 16px;
    width: 16px;
  }
}
</style>
