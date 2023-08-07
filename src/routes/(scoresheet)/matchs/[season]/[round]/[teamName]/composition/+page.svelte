<script lang="ts">
  export let data: {
    date: string;
    city: string;
    round: number;
    season: string;
    referee: string;
    odd: Team;
    even: Team;
  };

  const { date, city, round, season, even, odd, referee } = data;

  type Team = {
    lineUp: {
      board: string;
      name: string;
      ffeId: string;
      rating: string;
    }[];
    cap: string;
    club: string;
  };
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
        <td>{date}</td>
        <td>{city}</td>
        <td>Interclubs Adultes</td>
        <td>{round}</td>
      </tr>
    </tbody>
  </table>

  <div class="line-up-tables">
    <section>
      <table class="line-up-top-table">
        <thead>
          <tr>
            <th>Club ayant les blancs sur les échiquiers impairs</th>
            <th>S</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{odd.club}</td>
            <td />
          </tr>
        </tbody>
      </table>
      <table class="line-up-bottom-table">
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
          {#each odd.lineUp as item}
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
    </section>

    <section>
      <table class="line-up-top-table">
        <thead>
          <tr>
            <th>Club ayant les blancs sur les échiquiers pairs</th>
            <th>S</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{even.club}</td>
            <td />
          </tr>
        </tbody>
      </table>
      <table class="line-up-bottom-table">
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
          {#each even.lineUp as item}
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
      font-size: 1.75rem;
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

      tr + tr,
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

    .line-up-tables {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.25em;

      .line-up-top-table {
        tr {
          display: grid;
          grid-template-columns: 11fr 1fr;

          td {
            text-align: center;
            text-transform: uppercase;
          }
        }
      }

      .line-up-bottom-table {
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
    }

    .mentions {
      article {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
      }

      p {
        text-align: center;
      }

      .signatures {
        font-size: 0.95em;
        height: 4rem;
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
