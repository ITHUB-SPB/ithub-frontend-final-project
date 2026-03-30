<template>
  <button type="button" :class="classes" @click="props.onClick">
    {{ props.label }}
    <slot name="icon"></slot>
  </button>
</template>

<style scoped>
.button {
  box-sizing: border-box;
  display: inline-flex;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 6px;
  font-weight: 500;
  line-height: 24px;
  justify-content: center;
  align-items: center;
  height: 56px;
  width: 150px;
  font-size: 16px;
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

.button--fill {
  background-color: black;
  border-color: black;
}

.button--stroke {
  border-color: currentColor;
  background-color: transparent;
  color: currentColor;
}

.button--white {
  color: white;
}

.button--black {
  color: black;
}

.button--small {
  height: 48px;
  width: 162px;
  font-size: 14px;
}
</style>

<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    /**
     * The label of the button
     */
    label: string;
    /**
     * make button small
     */
    small?: boolean;
    /**
     * size of the button
     */
    variant?: 'fill' | 'stroke';
    /**
     * background color of the button
     */
    color?: "white" | "black";
    /**
     * onClick handler
     */
    onClick: (event: EventInit) => void;
  }>(),
  { small: false, variant: 'fill', color: "white" }
);

const classes = computed(() => ({
  'button': true,
  'button--small': props.small,
  [`button--${props.variant || 'fill'}`]: true,
  [`button--${props.color || 'white'}`]: true,
}));

</script>
