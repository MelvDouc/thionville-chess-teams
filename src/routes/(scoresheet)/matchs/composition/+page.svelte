<script lang="ts">
  import ScoresheetLineupTable from "$components/ScoresheetLineupTable.svelte";
  import type { ScoreSheetData } from "$lib/types";

  export let data: ScoreSheetData;

  const { date, city, round, season, even, odd, referee } = data;
</script>

<svelte:head>
  <title>{date}_rd{round}_feuille-de-match</title>
</svelte:head>

<header>
  <h1>Fédération française des échecs<br />Feuille de match</h1>
</header>

<main>
  <table class="match-info-table">
    <thead>
      <tr>
        <th>Date</th>
        <th>Lieu</th>
        <th>Compétition</th>
        <th>Ronde</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td contenteditable="true">{date}</td>
        <td contenteditable="true">{city}</td>
        <td contenteditable="true">Interclubs Adultes</td>
        <td contenteditable="true">{round}</td>
      </tr>
    </tbody>
  </table>

  <div class="lineup-tables">
    <section>
      <ScoresheetLineupTable parity="impairs" team={odd} />
    </section>

    <section>
      <ScoresheetLineupTable parity="pairs" team={even} />
    </section>
  </div>

  <div class="mentions">
    <article>
      <p>Nom du capitaine&nbsp;: <span contenteditable>{odd.cap}</span></p>
      <p>Nom de l'arbitre&nbsp;: <span contenteditable>{referee}</span></p>
      <p>Nom du capitaine&nbsp;: <span contenteditable>{even.cap}</span></p>
    </article>
    <article class="signatures">
      <p>Signature</p>
      <p>Signature</p>
      <p>Signature</p>
    </article>
    <article>
      <p>Le nom de l'arbitre doit être inscrit avant le début du match.</p>
      <p>C*&nbsp;: Contrôle des licences</p>
      <p>L'arbitre doit cocher cette case afin d'attester le contrôle.</p>
    </article>
  </div>
</main>

<footer>
  <p>Fédération Française des Échecs Saison {season}</p>
  <p>À renvoyer à : <span contenteditable>....................</span></p>
</footer>

<style lang="scss" scoped>
  header {
    h1 {
      text-transform: uppercase;
      text-align: center;
      font-size: 1.685rem;
      letter-spacing: 0.33em;
    }
  }

  main {
    display: flex;
    flex-flow: column nowrap;
    gap: 1.2em;

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

    .match-info-table {
      tr {
        display: grid;
        grid-template-columns: 1fr 3fr 3fr 1fr;

        td {
          text-align: center;
          text-transform: uppercase;
        }
      }
    }

    .lineup-tables {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.25em;
    }

    .mentions {
      article {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
      }

      p {
        text-align: center;
        margin: 0;
      }

      .signatures {
        font-size: 0.95em;
        height: 3.5rem;
        opacity: 0.33;
        align-items: center;
      }
    }
  }

  footer {
    text-align: center;
    font-style: italic;
  }
</style>
