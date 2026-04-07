<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    placeholder?: string | undefined;
    type?: "text" | "password" | "search" | "email" | "number";
    required?: boolean;
    name?: string | undefined;
    label?: string | undefined;
    defaultValue?: string | number | undefined;
    justify?: "left" | "center" | "end" | undefined;
    style?: Partial<CSSStyleDeclaration>;
  }>(),
  {
    type: "text",
    placeholder: "",
    required: false,
    defaultValue: "",
    justify: "left"
  }
);

  const styles: Partial<CSSStyleDeclaration> = {
    textAlign: props.justify ?? "left"
  }
</script>

<template>
  <section class="wrapper">
    <label :style="styles" v-if="props.label" :for="props.name" class="label">{{ props.label }}</label>
    <div class="input" :style="props.style">
      <slot name="icon-left"></slot>
      <input
        :id="props.name"
        :type="props.type"
        :placeholder="props.placeholder"
        :required="props.required"
        :name="props.name"
        :value="props.defaultValue"
        :style="styles"
        class="input__inner"
      />
      <slot name="right"></slot>
    </div>
  </section>
</template>

<style scoped>
* {
  box-sizing: border-box;
}
.wrapper {
  display: flex;
  flex-direction: column;
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
