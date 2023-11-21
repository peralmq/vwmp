<script lang="ts">
    import { getGapiClient } from "svelte-google-auth/client";

    const fetchRecipes = async () => {
        const client = await getGapiClient({
            discoveryDocs: [
                // 'https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest',
                "https://sheets.googleapis.com/$discovery/rest?version=v4",
            ],
        });
        const response = await client.sheets.spreadsheets.values.get({
            spreadsheetId: "1DzSezvZN28j3AVraTwnnPYwCfRmKXOdccZJExJ4NvY8",
            range: "RecipesDB!A1:D3",
        });
        const [header, ...rows]: string[][] = response.result.values;
        return rows.map((row) =>
            Object.fromEntries(row.map((v, i) => [header[i], v]))
        );
    };
</script>

{#await fetchRecipes()}
    Fetching...
{:then recipes}
    {#each recipes as recipe}
        <a href={recipe.url}>
            <div class="card">
                <h2>{recipe.name}</h2>
                <p>{recipe["prep-time-in-minutes"]} minutes</p>
                <img src={recipe.image} alt={recipe.name} />
            </div>
        </a>
    {/each}
{:catch error}
    <p style="color: red">{JSON.stringify(error, null, 2)}</p>
{/await}

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
