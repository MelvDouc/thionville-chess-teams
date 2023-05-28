<script lang="ts">
  export let data: { seasons: number[] };
</script>

<svelte:head>
  <title>Matchs par saison</title>
</svelte:head>

<div>
  <ul>
    {#each data.seasons as season}
      <li>
        <a href="/matchs/{season}">{season - 1}-{season}</a>
      </li>
    {/each}
  </ul>
</div>

<div>
  <a href="/matchs/nouveau" class="btn btn-secondary">
    <i class="bi bi-plus-lg" /> Nouveau match
  </a>
</div>

<style scoped>
  ul {
    list-style-type: disclosure-closed;
    list-style-position: inside;
  }
</style>
