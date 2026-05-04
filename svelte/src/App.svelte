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
<div>
  <h1>DOGS</h1>
     {#each dogs as dog }
     <p>{dog.name}</p>
     <p>{dog.description}</p>
     {:else}
     <p>Hämtar data...</p> 
     {/each}
</div>
</main>

<style>

</style>