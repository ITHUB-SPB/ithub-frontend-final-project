<script setup lang="ts">
import { ref, computed } from 'vue'
import Field from './Field.vue'

const min = 0
const max = 1100

const minValue = ref(1)
const maxValue = ref(1000)

const handleMin = () => {
    if (minValue.value > maxValue.value - 10) {
        minValue.value = maxValue.value - 10
    }
}

const handleMax = () => {
    if (maxValue.value < minValue.value + 10) {
        maxValue.value = minValue.value + 10
    }
}

const rangeStyle = computed(() => {
    const left = (minValue.value / max) * 100
    const right = (maxValue.value / max) * 100
    return {
        left: left + '%',
        width: right - left + '%'
    }
})
</script>

<template>
    <div class="slider-container">
        <div class="values">
            <Field label="From" type="number" :default-value="minValue" :placeholder="String(minValue)"/>
            <Field justify="end" label="To" type="number" :default-value="maxValue" :placeholder="String(maxValue)"/>
        </div>

        <div class="slider">
            <div class="track"></div>
            <div class="range" :style="rangeStyle"></div>

            <input type="range" :min="min" :max="max" v-model="minValue" @input="handleMin" class="thumb thumb-left" />
            <input type="range" :min="min" :max="max" v-model="maxValue" @input="handleMax" class="thumb thumb-right" />
        </div>
    </div>
</template>

<style scoped>
.slider-container {
    width: 300px;
    margin: 20px;
}

.values {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

/* .values > section:last-of-type {
    text-align: right;
} */

.slider {
    position: relative;
    height: 6px;
}

.track {
    position: absolute;
    height: 6px;
    width: 100%;
    background: #ddd;
    border-radius: 5px;
}

.range {
    position: absolute;
    height: 6px;
    background: black;
    border-radius: 5px;
}

input[type="range"] {
    position: absolute;
    width: 100%;
    top: -6px;
    pointer-events: none;
    -webkit-appearance: none;
    appearance: none;
    background: none;
}

input[type="range"]::-webkit-slider-thumb {
    pointer-events: all;
    width: 16px;
    height: 16px;
    background: black;
    border-radius: 50%;
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
}
</style>