<script setup lang="ts">
import { onMounted, ref } from "vue";

type Dog = { id: string; name: string; description: string };

const data = ref<Dog[]>([]);

onMounted(async () => {
  const res = await fetch("http://localhost:3000/dogs");
  data.value = await res.json();
});

const favorites = ref<Set<string>>(new Set())

const isFavorite = (id: string) => {
  if (favorites.value.has(id)) {
    favorites.value.delete(id)
  } else {
    favorites.value.add(id)
  }
}
</script>

<template>
  <h1>DOGS</h1>

  <div v-for="dog in data" :key="dog.id">
    <button @click="isFavorite(dog.id)">
    {{ favorites.has(dog.id) ? "🤍" : "🩷" }}</button>
    <h4>{{ dog.name }}</h4>
    <p>{{ dog.description }}</p>
  </div>
</template>

<style scoped></style>
