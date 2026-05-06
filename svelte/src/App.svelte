<script lang="ts">

import { onMount } from "svelte";
import Favorites from "./Favorites.svelte";

 export let dogs: any[] | null | undefined = [];

 let favorites: any[] = [];

onMount(async() => {
  const resDogs = await fetch("http://localhost:3000/dogs");
  dogs = await resDogs.json();

  const resFav = await fetch("http://localhost:3000/favorites");
  favorites = await resFav.json();
});

async function toggleFavorite(dog: any) {
  const existing = favorites.find(f => f.dogId === dog.id)

  if (existing) {
    await fetch (`http://localhost:3000/favorites/${existing.id}`, {
      method: "DELETE"
    });

    favorites = favorites.filter(f => f.id !== existing.id);
  } else {
    const res = await fetch("http://localhost:3000/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        dogId: dog.id,
        name: dog.name,
        description: dog.description
      })
    });

    const newFav = await res.json();
    favorites = [...favorites, newFav];
  }
}

function isFavorite(dog: any) {
  return favorites.some(f => f.dogId === dog.id);
}

async function handleRemove(event: any) {
  const fav = event.detail;
  await fetch(`http://localhost:3000/favorites/${fav.id}`, {
    method: "DELETE"
  });
  favorites = favorites.filter(f => f.id !== fav.id);
}

</script>

<main>

 <h1>DOGS</h1>
 <Favorites {favorites} on:remove={handleRemove}/>

<ul>
  {#each dogs as dog}
    <li>
      <button on:click={() => toggleFavorite(dog)}> {favorites.some(f => f.dogId === dog.id) ? "🤍" : "🩵"}</button>
      <h4>{dog.name}</h4>
      <p>{dog.description}</p>
    </li>
  {:else}
    <p>Hämtar data...</p>
  {/each}
</ul>


</main>

<style>
  h1 {
    text-align: center;
}

li {
    list-style: none;
    border: 1px solid rgb(19, 198, 222);
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