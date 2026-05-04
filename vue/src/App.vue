<script setup lang="ts">
import Favorites from "./Favorites.vue";
import { onMounted, ref, provide } from "vue";

type Dog = { id: string; name: string; description: string };

const data = ref<Dog[]>([]);
const favorites = ref<Dog[]>([]);

onMounted(async () => {
  const [dogsRes, favRes] = await Promise.all([
    fetch("http://localhost:3000/dogs"),
    fetch("http://localhost:3000/favorites"),
  ]);
  data.value = await dogsRes.json();
  favorites.value = await favRes.json();
});

const toggleFavorite = async (dog: Dog) => {
  const isFav = favorites.value.some((f) => f.id === dog.id);
  if (isFav) {
    await fetch(`http://localhost:3000/favorites/${dog.id}`, {
      method: "DELETE",
    });
    favorites.value = favorites.value.filter((f) => f.id !== dog.id);
  } else {
    await fetch("http://localhost:3000/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dog),
    });

    favorites.value.push(dog);
  }
};

provide("favorites", favorites);
provide("toggleFavorite", toggleFavorite);
</script>

<template>
  <h1>DOGS</h1>

  <Favorites />

  <ul>
  <li v-for="dog in data" :key="dog.id">
    <button @click="toggleFavorite(dog)">
      {{ favorites.some((f) => f.id === dog.id) ? "🤍" : "🩷" }}
    </button>
    <h4>{{ dog.name }}</h4>
    <p>{{ dog.description }}</p>
  </li>
</ul>

</template>

<style scoped>
h1 {
  text-align: center;
}

h1 {
    text-align: center;
}

li {
    list-style: none;
    border: 1px solid rgb(215, 19, 222);
    border-radius: 10px;
    padding: 16px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    padding: 0;
}

button {
    background: none;
    border: none;
    font-size: 15px;
}
</style>
