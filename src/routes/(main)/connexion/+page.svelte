<script lang="ts">
  export let form: { message: string } | undefined;
</script>

<svelte:head>
  <title>Connexion</title>
</svelte:head>

<form class="form mb-3" method="POST">
  <div class="container d-flex flex-column gap-3 p-3">
    <section class="row">
      <div class="col-12">
        <label class="form-label" for="ffeId">Code FFE</label>
        <input class="form-control" type="text" id="ffeId" name="ffeId" required />
      </div>
    </section>
    <section class="row">
      <div class="col-12">
        <label class="form-label" for="pwd">Mot de passe</label>
        <input class="form-control" type="password" id="pwd" name="pwd" required />
      </div>
    </section>
    <section class="row">
      <div class="col-12">
        <div class="d-flex justify-content-center align-items-center">
          <button type="submit" class="btn btn-primary">Se connecter</button>
        </div>
      </div>
    </section>
  </div>
</form>

{#if form?.message}
  <p>{form.message}</p>
{/if}
