<script lang="ts">
import { createEventDispatcher } from "svelte";

export let favorites: any[] | null | undefined = [];

const dispatch = createEventDispatcher();

function removeFavorite(fav: { id: any; }) {
    dispatch("remove", fav);
}
</script>

<main>
<div class="favorite-wrapper">
<h3>Favorites</h3>

<ul>
    {#each favorites as fav}
    <li>
        <p class="text">{fav.name} <button on:click={() => removeFavorite(fav)}>❌</button></p>
    </li>
    {:else}
    <p class="text"> You don't have any favorites yet... Press on the heart to add to favorites</p>
    {/each}
</ul>
</div>

</main>

<style>
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