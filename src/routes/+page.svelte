<script lang="ts">
import { onMount } from 'svelte';
import Papa from 'papaparse';

let recipes = []
type Recipe = {
    name: string,
    image: string,
    url: string,
    'prep-time-in-minutes': number,
}

const fetchRecipes = async () => {
        const res = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSflIdd66CaW9ZOLw-WU6KhxQyYnr8rqvR6G6SuYruOAoobw_8y6916JBxRp7LN5iZKbukNvB348FHa/pub?gid=0&single=true&output=csv')
       const data = await res.text()
        return Papa.parse(data, {header: true, dynamicTyping: true}).data as Recipe[]
    }


onMount(async () => {
    recipes = await fetchRecipes()
})

</script>

<main>
<h1>Vegan Weekly Meal Planner</h1>

<!-- <button on:click={() => fetchingRecipes = fetchRecipes()} >
    Fetch Recipes
</button> -->



{#await fetchRecipes()}
    <p>...fetching recipes</p>
{:then recipes}
{#each recipes as recipe}
<a href={recipe.url}>
    <div class="card">
        <h2>{recipe.name}</h2>
        <p>{recipe['prep-time-in-minutes']} minutes</p>
        <img src={recipe.image} />
    </div>
</a>
{/each}

{:catch error}
    <p style="color: red">{error.message}</p>
{/await}

</main>

<style>

    .card {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 1rem;
        margin: 1rem;
        width: 300px;
        display: inline-block;
    }
	img {
		width: 100%;
		margin: 0;
	}
</style>