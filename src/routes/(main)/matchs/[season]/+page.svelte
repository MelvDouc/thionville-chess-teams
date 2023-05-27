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

<table>
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
    <tbody>
      <tr>
        <td>{item.teamName}</td>
      </tr>
    </tbody>
    <tbody>
      {#each item.matches as m}
        <tr>
          <td>{m.round}</td>
          <td>{m.opponent}</td>
          <td>
            <address>
              <p>{m.address}</p>
              <p>{m.zipCode} {m.city}</p>
            </address>
          </td>
          <td>{formatDate(m.date)}</td>
          <td>
            <a href="/matchs/{m.season}/{m.round}/{m.teamName}/modifier">Modifier</a>
            <a href="/matchs/{m.season}/{m.round}/{m.teamName}/composition" target="_blank">Composition</a>
          </td>
        </tr>
      {/each}
    </tbody>
  {/each}
</table>
