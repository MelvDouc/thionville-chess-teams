<script lang="ts">
  import PlayerButtons from "$components/PlayerButtons.svelte";
  import PlayerCardItem from "$components/PlayerCardItem.svelte";
  import { roleTranslations } from "$lib/PlayerRole";
  import { getDatePortion } from "$lib/services/date.service";
  import type { PublicPlayer, User } from "$lib/types";

  export let data: { player: PublicPlayer; user: User };
</script>

<svelte:head>
  <title>Fiche joueur</title>
</svelte:head>

<h1>Fiche joueur</h1>

<div class="wrapper mb-4">
  <PlayerCardItem title="Code FFE">
    {data.player.ffeId}
  </PlayerCardItem>

  {#if data.player.fideId}
    <PlayerCardItem title="N° FIDE">
      {data.player.fideId}
    </PlayerCardItem>
  {/if}

  <PlayerCardItem title="NOM">
    {data.player.lastName}
  </PlayerCardItem>

  <PlayerCardItem title="Prénom">
    {data.player.firstName}
  </PlayerCardItem>

  <PlayerCardItem title="Adresse email">
    {data.player.email}
  </PlayerCardItem>

  {#if data.player.phone1}
    <PlayerCardItem title="Tél. 1">
      {data.player.phone1}
    </PlayerCardItem>
  {/if}

  {#if data.player.phone2}
    <PlayerCardItem title="Tél. 2">
      {data.player.phone2}
    </PlayerCardItem>
  {/if}

  {#if data.player.birthDate instanceof Date}
    <PlayerCardItem title="Date de naissance">
      {getDatePortion(data.player.birthDate)}
    </PlayerCardItem>
  {/if}

  {#if "isMale" in data.player}
    <PlayerCardItem title="Sexe">
      {data.player.isMale ? "H" : "F"}
    </PlayerCardItem>
  {/if}

  <PlayerCardItem title="Rôle">
    {roleTranslations[data.player.role]}
  </PlayerCardItem>

  {#if data.player.membership}
    <PlayerCardItem title="Type d'adhérent">
      {data.player.membership}
    </PlayerCardItem>
  {/if}
</div>

<PlayerButtons playerFfeId={data.player.ffeId} playerRole={data.player.role} user={data.user} />

<style lang="scss">
  .wrapper {
    columns: 2;
  }
</style>
