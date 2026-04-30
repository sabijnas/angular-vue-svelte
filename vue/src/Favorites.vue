<script setup lang="ts">
import { onMounted, ref } from 'vue';

type Dog = {id: string, name: string}
const favorites = ref<Dog[]>([]);

onMounted(async () => {
    const res = await fetch("http://localhost:3000/favorites")
    favorites.value = await res.json();
})
</script>

<template>
<h2>Favorites</h2>
<p v-if="favorites.length === 0">You don't have any favorites yet... Press on the heart to add to favorites</p>

<ul>
    <li v-for="dog in favorites" :key="dog.id">
        <p>{{ dog.name }} <button>❌</button></p>
    </li>
</ul>
</template>

<style scoped></style>