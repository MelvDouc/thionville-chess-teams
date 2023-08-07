<script lang="ts">
  export let data: { seasons: number[] };
</script>

<svelte:head>
  <title>Matchs par saison</title>
</svelte:head>

<h1>Saisons</h1>

<ul>
  {#each data.seasons as season}
    <li>
      <a href="/matchs/{season}">{season - 1}-{season}</a>
    </li>
  {/each}
</ul>

<style lang="scss" scoped>
  ul {
    list-style-type: disclosure-closed;
    list-style-position: inside;
  }
</style>
