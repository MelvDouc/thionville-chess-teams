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

<p>Tous les matchs commencent à <strong>14h15</strong>.</p>

<table class="table">
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
    <tbody class="table__subtitle-body">
      <tr>
        <td colspan={5}>{item.teamName}</td>
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
          <td>
            <div class="table__actions">
              <a href="/matchs/{m.season}/{m.round}/{m.teamName}/modifier" class="btn btn-primary">
                <i class="bi bi-pen-fill" />
              </a>
              <a
                href="/matchs/{m.season}/{m.round}/{m.teamName}/composition"
                class="btn btn-info"
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
