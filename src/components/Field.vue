<script setup lang="ts">
    const props = withDefaults(defineProps<{
        placeholder?: string | undefined,
        type?: "text" | "password" | "search" | "email",
        required?: boolean,
        name?: string | undefined
    }>(), {
        type: "text",
        placeholder: "",
        required: false
    })
</script>

<template>
    <section class="input">
        <slot name="icon-left"></slot>
        <input 
            :type="props.type"
            :placeholder="props.placeholder"
            :required="props.required"
            :name="props.name" 
            class="input__inner"
        >
        <slot name="icon-right"></slot>
    </section>
</template>

<style scoped>
    * {
        box-sizing: border-box;
    }
    .input {
        display: flex;
        align-items: center;
        gap: 8px;
        background-color: white;
        border: 1px solid rgb(206, 206, 206);
        border-radius: 7px;
        padding: 16px;
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
</style>