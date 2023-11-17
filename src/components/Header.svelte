<script lang="ts">
  import HeaderDropdown from "$components/HeaderDropdown.svelte";
  import LogOutButton from "$components/LogOutButton.svelte";
  import type { User } from "$lib/types";

  export let user: User | null;
  export let title: string;
</script>

<header>
  <nav class="h-100 navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a href="/" class="navbar-brand d-flex align-items-center gap-2">
        <img
          src="http://thionville-echecs.fr/wp-content/uploads/2022/05/cropped-logo-blanc2x-192x192.png"
          alt="Logo"
          width={30}
          height={24}
          class="d-inline-block align-text-top"
        />
        <h1 class="m-0 text-wrap fs-5">{title}</h1>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          {#if user}
            <HeaderDropdown mainText="Matchs">
              <li><a href="/matchs" class="dropdown-item">Par saison</a></li>
              <li><a href="/matchs/nouveau" class="dropdown-item">Ajouter un match</a></li>
            </HeaderDropdown>
            <HeaderDropdown mainText="Joueurs">
              <li><a href="/joueurs" class="dropdown-item">Liste</a></li>
              <li><a href="/joueurs/nouveau" class="dropdown-item">Ajouter un joueur</a></li>
            </HeaderDropdown>
          {/if}
        </ul>
        <span class="navbar-text">
          {#if user}
            <LogOutButton {user} />
          {:else}
            <a href="/connexion" class="nav-link">Se connecter</a>
          {/if}
        </span>
      </div>
    </div>
  </nav>
</header>
