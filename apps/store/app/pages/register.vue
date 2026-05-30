<script lang="ts" setup>
import { Field, Button } from "@repo/ui";

const { fetch: refreshSession } = useUserSession();

const errorRef = ref<Error | null>(null);

const handleLogin = async (event: SubmitEvent) => {
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);

  const phone = formData.get("phone");
  const password = formData.get("password");

  try {
    errorRef.value = null;

    await $fetch("/api/register", {
      method: "POST",
      body: {
        phone,
        password,
      },
    });

    await navigateTo("/login");
  } catch (error) {
    errorRef.value = error as Error;
  }
};
</script>

<template>
  <main class="page">
    <h2 class="page-title">Sign Up</h2>

    <p v-if="errorRef">{{ errorRef?.message }}</p>

    <form class="form" method="post" @submit.prevent="handleLogin">
      <Field label="Phone" placeholder="79991112233" name="phone" type="tel" />
      <Field label="Password" placeholder="********" name="password" type="password" />
      <Button label="Sign Up" type="submit" />
      <NuxtLink href="/login">Login an account</NuxtLink>
    </form>
  </main>
</template>

<style scoped>
.page {
  flex: 1;
  padding: 40px 17px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.page-title {
  font-size: 24px;
  line-height: 32px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
</style>
