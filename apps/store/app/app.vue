<script lang="ts" setup>
import { api } from '../convex/_generated/api'

const { data: brands, error } = await useConvexQuery(
  api.brands.get, 
  {}
)

const { 
  execute, pending, reset, error: mutationError
} = useConvexMutation(api.brands.create)

const handleNewBrand = async () => {
  if (brandInput.value.trim().length === 0) {
    return
  }

  await execute({ title: brandInput.value })
}

const brandInput = ref('')

</script>

<template>
  <p v-if="error || mutationError">
    {{ error?.message || mutationError?.message }}
  </p>

  <form @submit.prevent="handleNewBrand">
    <input v-model="brandInput" placeholder="Новый бренд">
    <button type="submit">Добавить</button>
  </form>

  <p v-if="pending">Обработка</p>

  <div v-if="!error">
    <ul>
      <li v-for="brand in brands" :key="brand._id">{{ brand.title }}</li>
    </ul>
  </div>
</template>
