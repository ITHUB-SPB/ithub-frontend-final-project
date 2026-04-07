<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    placeholder?: string | undefined;
    type?: "text" | "password" | "search" | "email";
    required?: boolean;
    name?: string | undefined;
    label?: string | undefined;
    style?: Partial<CSSStyleDeclaration>;
  }>(),
  {
    type: "text",
    placeholder: "",
    required: false,
  }
);
</script>

<template>
  <label v-if="props.label" :for="props.name" class="label">{{ props.label }}</label>
  <section class="input" :style="props.style">
    <slot name="icon-left"></slot>
    <input
      :id="props.name"
      :type="props.type"
      :placeholder="props.placeholder"
      :required="props.required"
      :name="props.name"
      class="input__inner"
    />
    <slot name="right"></slot>
  </section>
</template>

<style scoped>
* {
  box-sizing: border-box;
}
.label {
  font-size: 14px;
  line-height: 16px;
  color: rgb(84, 84, 84);
  font-weight: 500;
}
.input {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: white;
  border: 1px solid rgb(206, 206, 206);
  border-radius: 7px;
  padding: 16px;
  margin-top: 8px;
}
.input__inner {
  background-color: transparent;
  border: 0;
  outline: 0;
  color: black;
  font-size: 14px;
  letter-spacing: -0.5%;
  flex: 1 0 104px;
}
.input__inner::placeholder {
  color: #656565;
}
</style>
