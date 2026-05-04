<script>

import { onMount } from "svelte";
/**
   * @type {any[] | null | undefined}
   */
 export let dogs = [];

onMount(() => {
  fetch("http://localhost:3000/dogs")
  .then(res => res.json())
  .then(data => {
    dogs = data 
  })
})
</script>

<main>

 <h1>DOGS</h1>

<ul>
  {#each dogs as dog}
    <li>
      <button>🩵</button>
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