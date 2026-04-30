<script setup lang="ts">
import Favorites from "./Favorites.vue";
import { onMounted, ref } from "vue";

type Dog = { id: string; name: string; description: string };

const data = ref<Dog[]>([]);
const favorites = ref<Dog[]>([]);

onMounted(async () => {
  const [dogsRes, favRes] = await Promise.all([
    fetch("http://localhost:3000/dogs"),
    fetch("http://localhost:3000/favorites")
  ])
  data.value = await dogsRes.json();
  favorites.value = await favRes.json()
});

const toggleFavorite = async (dog: Dog) => {
  const isFav = favorites.value.some(f => f.id === dog.id)
  if (isFav) {
    await fetch (`http://localhost:3000/favorites/${dog.id}`, {
      method: "DELETE"
    })
    favorites.value = favorites.value.filter(f => f.id !== dog.id)
  } else {
    await fetch ("http://localhost:3000/favorites", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(dog)
    })

    favorites.value.push(dog)
  }
}
</script>

<template>
  <h1>DOGS</h1>

  <Favorites/>

  <div v-for="dog in data" :key="dog.id">
    <button @click="toggleFavorite(dog)">
    {{ favorites.some(f => f.id === dog.id) ? "🤍" : "🩷" }}</button>
    <h4>{{ dog.name }}</h4>
    <p>{{ dog.description }}</p>
  </div>
</template>

<style scoped></style>
