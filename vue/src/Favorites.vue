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
<div class="favorite-wrapper">
  <h3>Favorites</h3>
  <p class="text" v-if="favorites.length === 0">
    You don't have any favorites yet... Press on the heart to add to favorites
  </p>

  <ul>
    <li v-for="dog in favorites" :key="dog.id">
      <p class="text">{{ dog.name }} <button @click="removeFavorite(dog.id)">❌</button></p>
    </li>
  </ul>
</div>

</template>

<style scoped>
.favorite-wrapper {
    border: 1px solid black;
    max-width: 300px;
    margin: 0 auto;
}

.text, h3 {
    margin-left: 30px;
}

li {
    list-style: none;
}

button {
    background: none;
    border: none;
    font-size: 15px;
}
</style>
