<script setup lang="ts">
import { onMounted, ref } from "vue";

type Dog = { id: string; name: string; description: string };

const data = ref<Dog[]>([]);

onMounted(async () => {
  const res = await fetch("http://localhost:3000/dogs");
  data.value = await res.json();
});
</script>

<template>
  <h1>DOGS</h1>

  <div v-for="dog in data" :key="dog.id">
    <button>🩷</button>
    <h4>{{ dog.name }}</h4>
    <p>{{ dog.description }}</p>
  </div>
</template>

<style scoped></style>
