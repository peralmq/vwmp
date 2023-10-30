<script lang="ts">
    import { invalidateAll } from "$app/navigation";
    import { signIn, signOut, initialize } from "svelte-google-auth/client";
    import type { PageData } from "./$types.js";
    import Recipes from "./recipes.svelte";

    export let data: PageData;
    initialize(data, invalidateAll);
</script>

{#if data.auth.user}
    <div>
        <button on:click={() => signOut()}
            >Sign out {data.auth.user.name}</button
        >
    </div>
    <Recipes />
{:else}
    <button
        on:click={() =>
            signIn(["https://www.googleapis.com/auth/spreadsheets"])}
        >Sign In</button
    >
{/if}
