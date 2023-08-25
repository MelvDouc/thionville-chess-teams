<script lang="ts">
  import { roleTranslations } from "$lib/PlayerRole.js";
  import PlayerButtons from "../../../../components/PlayerButtons.svelte";

  export let data: { player: App.PublicPlayer; user: App.User };

  const player = {
    "Code FFE": data.player.ffeId,
    "N° FIDE": data.player.fideId,
    Prénom: data.player.firstName,
    "Nom de famille": data.player.lastName,
    "Date de naissance": data.player.birthDate?.toLocaleDateString(),
    "Adresse email": data.player.email,
    "Tél. 1": data.player.phone1,
    "Tél. 2": data.player.phone2,
    Sexe: data.player.isMale ? "H" : "F",
    Rôle: roleTranslations[data.player.role],
    "Type d'adhérent": data.player.membership,
    "Équipe 1": data.player.team1,
    "Équipe 2": data.player.team2,
  };
</script>

<svelte:head>
  <title>Fiche joueur</title>
</svelte:head>

<h1>Fiche joueur</h1>

<div class="wrapper mb-4">
  {#each Object.entries(player) as [key, value]}
    {#if value != null}
      <div class="mb-3">
        <h3 class="my-1">{key}</h3>
        <div>{value}</div>
      </div>
    {/if}
  {/each}
</div>

<PlayerButtons playerFfeId={data.player.ffeId} playerRole={data.player.role} user={data.user} />

<style scoped>
  .wrapper {
    columns: 2;
  }
</style>
