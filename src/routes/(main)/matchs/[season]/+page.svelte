<script lang="ts">
  import { formatDate } from "$lib/services/date.service";
  import type { WithIdMatch } from "$lib/types";

  export let data: {
    season: number;
    matches: Record<string, WithIdMatch[]>;
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
    {#each Object.entries(data.matches) as [teamName, matches]}
      <tbody class="subtitleTbody">
        <tr>
          <td colspan={5} class="text-center">{teamName}</td>
        </tr>
      </tbody>
      <tbody>
        {#each matches as { season, round, opponent, address, zipCode, city, date, _id }}
          <tr>
            <td>{round}</td>
            <td>{opponent}</td>
            <td>
              <address class="m-0">
                <div>{address}</div>
                <div>{zipCode} {city.toLocaleUpperCase()}</div>
              </address>
            </td>
            <td>{formatDate(date)}</td>
            <td class="align-middle">
              <div class="d-flex justify-content-center align-items-center gap-2">
                <a href="/matchs/modifier?_id={_id}" class="btn btn-primary">
                  <i class="bi bi-pen-fill" />
                </a>
                <a
                  href="/matchs/composition?saison={season}&ronde={round}&equipe={teamName}"
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
