<header>
  <section class="header-left">
    <img src="http://thionville-echecs.fr/wp-content/uploads/2022/05/cropped-logo-blanc2x-192x192.png" alt="Logo" width="30" height="30" />
    <h1>Thionville Échecs — Équipes</h1>
  </section>
  <section class="header-right">
    <nav>
      <ul>
        <li>
          <a href="/">Accueil</a>
        </li>
        <li>
          <a href="/matchs">Matchs</a>
        </li>
        <li>
          <a href="/joueurs">Joueurs</a>
        </li>
      </ul>
    </nav>
  </section>
</header>

<style lang="scss" scoped>
  header {
    $bg-clr1: hsl(0, 0%, 20%);
    $bg-clr2: hsl(0, 0%, 13%);
    $bs-clr: hsl(0, 0%, 16%);
    padding: 0.8em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1em;
    background: hsl(0, 0%, 13%);
    background: linear-gradient(to bottom, $bg-clr1 0%, $bg-clr2 100%);
    box-shadow: inset 0 1px 2px $bs-clr, inset 0 -1px 2px $bs-clr;
    color: white;

    section {
      max-width: 100vw;
    }

    h1 {
      word-break: break-word;
      font-size: 1.2rem;

      @media only screen and (width >= 400px) {
        font-size: 1.5rem;
      }

      @media only screen and (width >= 600px) {
        font-size: 1.75rem;
      }
    }
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 1em;
  }

  .header-right {
    nav {
      ul {
        list-style: none;
        display: flex;
        align-items: center;
        gap: 0.5em;

        a {
          text-decoration: none;
          color: inherit;
          transition: color 200ms ease-out;

          &:hover {
            color: gold;
          }
        }
      }
    }
  }
</style>
