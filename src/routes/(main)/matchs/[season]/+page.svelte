<script lang="ts">
  import { formatDate } from "$lib/date-formatter.js";

  export let data: {
    season: number;
    matches: {
      teamName: string;
      matches: App.Match[];
    }[];
  };
</script>

<svelte:head>
  <title>Matchs {data.season - 1}-{data.season}</title>
</svelte:head>

<p class="mb-5">Tous les matchs commencent à <strong>14h15</strong>.</p>

<div class="tableWrapper">
  <table class="table table-light table-striped">
    <thead>
      <tr>
        <th>Rd.</th>
        <th>Adversaire</th>
        <th>Adresse</th>
        <th>Date</th>
        <th>Actions</th>
      </tr>
    </thead>
    {#each data.matches as item}
      <tbody class="subtitleTbody">
        <tr>
          <td colspan={5} class="text-center">{item.teamName}</td>
        </tr>
      </tbody>
      <tbody>
        {#each item.matches as m}
          <tr>
            <td>{m.round}</td>
            <td>{m.opponent}</td>
            <td>
              <address>
                <div>{m.address}</div>
                <div>{m.zipCode} {m.city}</div>
              </address>
            </td>
            <td>{formatDate(m.date)}</td>
            <td class="align-middle">
              <div class="d-flex justify-content-center align-items-center gap-2">
                <a
                  href="/matchs/{m.season}/{m.round}/{m.teamName}/modifier"
                  class="btn btn-primary"
                >
                  <i class="bi bi-pen-fill" />
                </a>
                <a
                  href="/matchs/{m.season}/{m.round}/{m.teamName}/composition"
                  class="btn btn-warning"
                  target="_blank"
                >
                  <i class="bi bi-table" />
                </a>
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    {/each}
  </table>
</div>

<style lang="scss">
  .subtitleTbody {
    td {
      box-shadow: initial;
      background: #222;
      color: white;
    }
  }
</style>
