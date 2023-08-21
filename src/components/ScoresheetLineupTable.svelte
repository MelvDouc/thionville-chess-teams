<script lang="ts">
  export let parity: "pairs" | "impairs";
  export let team: Scoresheet.Team;
</script>

<table class="lineup-table__top">
  <thead>
    <tr>
      <th>Club ayant les blancs sur les échiquiers {parity}</th>
      <th>S</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td contenteditable="true">{team.club}</td>
      <td />
    </tr>
  </tbody>
</table>
<table class="lineup-table__bottom">
  <thead>
    <tr>
      <th />
      <th>Nom et Prénom</th>
      <th class="player-ffe-id">Code FFE</th>
      <th class="player-rating">Elo</th>
      <th>C*</th>
      <th>R</th>
    </tr>
  </thead>
  <tbody>
    {#each team.lineup as item}
      <tr>
        <td contenteditable>{item.board}</td>
        <td contenteditable>{item.name}</td>
        <td contenteditable>{item.ffeId}</td>
        <td contenteditable>{item.rating}</td>
        <td />
        <td />
      </tr>
    {/each}
  </tbody>
</table>

<style lang="scss" scoped>
  table {
    border: var(--table-border);
    border-collapse: collapse;
    width: 100%;

    thead,
    tbody {
      display: block;
    }

    tbody tr:first-child {
      border-top: var(--table-border);
    }

    th + th,
    td + td {
      border-left: var(--table-border);
    }

    th,
    td {
      padding: 0.33em;
    }

    th {
      text-transform: uppercase;
      text-align: center;
    }
  }

  tr + tr {
    border-top: 1px solid black;
  }

  .lineup-table__top {
    tr {
      display: grid;
      grid-template-columns: 11fr 1fr;

      td {
        text-align: center;
        text-transform: uppercase;
      }
    }
  }

  .lineup-table__bottom {
    border-top: 0;

    tbody {
      td:first-child {
        font-weight: bold;
        text-align: center;
      }
    }

    th {
      text-transform: unset;
    }

    tr {
      display: grid;
      grid-template-columns: 1fr 5fr 2fr 2fr 1fr 1fr;
    }
  }
</style>
