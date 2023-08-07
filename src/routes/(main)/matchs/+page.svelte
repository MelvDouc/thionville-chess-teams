<script lang="ts">
  export let data: { seasons: number[] };
</script>

<svelte:head>
  <title>Matchs par saison</title>
</svelte:head>

<section class="top">
  <ul>
    {#each data.seasons as season}
      <li>
        <a href="/matchs/{season}">{season - 1}-{season}</a>
      </li>
    {/each}
  </ul>
</section>

<style lang="scss" scoped>
  .top {
    margin-bottom: 2em;

    ul {
      list-style-type: disclosure-closed;
      list-style-position: inside;
    }
  }
</style>
