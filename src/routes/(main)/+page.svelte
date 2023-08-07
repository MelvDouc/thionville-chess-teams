<script lang="ts">
  import LogInForm from "$components/LogInForm.svelte";

  export let data: Pick<App.Locals, "user">;
  const title = data.user ? "Accueil" : "Connexion";
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

{#if data.user}
  <h1>{title}</h1>

  <div class="overlay px-2 py-3">
    <p>
      Bienvenue sur le site de gestion des équipes du club <strong>Thionville Échecs</strong>. Avec
      les privilèges nécessaires, vous pouvez ici consulter la liste des
      <a href="/joueurs">joueurs</a>
      et des <a href="/matchs">matchs</a>, ajouter des éléments à ces listes, les modifier ou les
      supprimer.
    </p>

    <p class="m-0">
      Ce site a été conçu par moi-même, Melvin DOUCET, joueur ou ancien joueur du club au moment où
      vous lisez ces lignes. Si je ne me charge plus de l'entretenir, veuillez contacter la personne
      adéquate auprès du club. Je suis joignable par formulaire de contact sur <a
        href="https://www.melvin-doucet.com/contact"
        target="_blank">mon site</a
      >.
    </p>
  </div>
{:else}
  <LogInForm />
{/if}

<style lang="scss">
  .overlay {
    $red: 135;
    $green: 206;
    $blue: 235;
    $clr1: rgb($red, $green, $blue, 0.55);
    $clr2: rgb($red, $green, $blue, 0.75);
    border-radius: 5px;
    background: $clr1;
    background: linear-gradient(to bottom, $clr1, $clr2);
  }
</style>
