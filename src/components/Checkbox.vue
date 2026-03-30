<script lang="ts" setup>
import { ref } from 'vue';

const checked = ref<boolean>(false);

const props = withDefaults(
  defineProps<{
    /**
     * The label of the checkbox
     */
    label: string;
     /**
     * onChange handler
     */
    onChange?: (event: EventInit) => void;
  }>(),
  {}
);

</script>

<template>
  <label>
    <input type="checkbox" v-model="checked"/>
    {{ props.label }}
    <slot></slot>
  </label>
</template>

<style scoped>
label {
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  line-height: 24px;
  color: black;
  gap: 8px;
  font-family: inherit;
}

input {
  appearance: none;
  box-sizing: border-box;
  display: inline-flex;
  cursor: pointer;
  border: 1px solid #d3d3d3;
  border-radius: 3px;
  justify-content: center;
  align-items: center;
  height: 16px;
  width: 16px;
  background-color: transparent;
  font-family: inherit;
}

input::after {
  content: "";
  position: absolute;
  width: 0px;
  height: 0px;
  background-image: url("../assets/icons/check.svg");
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 3px;
  transition: 200ms;
}

input:checked {
  border-color: black;
  background-color: black;
  color: white;
}

input:checked::after {
  border-color: black;
  background-color: black;
  color: white;
  width: 16px;
  height: 16px;
}
</style>
