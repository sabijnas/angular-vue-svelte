<script setup lang="ts">
import { inject } from "vue";

type Dog = { id: string; name: string };

const favorites = inject("favorites") as any;
const toggleFavorite = inject("toggleFavorite") as (dog: Dog) => void;

const removeFavorite = (id: string) => {
  const dog = favorites.value.find((d: Dog) => d.id === id);
  if (dog) toggleFavorite(dog);
};
</script>

<template>
  <h2>Favorites</h2>
  <p v-if="favorites.length === 0">
    You don't have any favorites yet... Press on the heart to add to favorites
  </p>

  <ul>
    <li v-for="dog in favorites" :key="dog.id">
      <p>{{ dog.name }} <button @click="removeFavorite(dog.id)">❌</button></p>
    </li>
  </ul>
</template>

<style scoped></style>
