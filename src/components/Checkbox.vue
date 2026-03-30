<script lang="ts" setup>
import checkIcon from '@/assets/icons/check.svg'

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
    <input type="checkbox" @change="props.onChange" />
    {{ props.label }}
  </label>
  <slot></slot>
</template>

<style scoped>
input {
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
}

input::after {
  content: "";
  position: absolute;
  width: 0px;
  height: 0px;
  font-size: 30px;
  background-image: url("/favicon.ico");
  background-repeat: no-repeat;
  transition: 500ms;
}

input:checked {
  border-color: black;
  background-color: black;
  color: white;
}
</style>
