<script lang="ts">
  import FormGroup from "$components/form/FormGroup.svelte";
  import FormWrapper from "$components/FormWrapper.svelte";

  export let form: { errors: string[] } | undefined;
</script>

<svelte:head>
  <title>Connexion</title>
</svelte:head>

<FormWrapper errors={form?.errors ?? null}>
  <form class="form" method="POST">
    <div class="container d-flex flex-column gap-3 p-3">
      <section class="row mb-2">
        <div class="col-12">
          <FormGroup id="ffeId" required>Code FFE</FormGroup>
        </div>
      </section>
      <section class="row mb-4">
        <div class="col-12">
          <FormGroup id="pwd" type="password" required>Mot de passe</FormGroup>
        </div>
      </section>
      <section class="row mb-2">
        <div class="col-12">
          <div class="d-flex justify-content-center align-items-center">
            <button type="submit" class="btn btn-primary">Se connecter</button>
          </div>
        </div>
      </section>
      <section class="row">
        <p class="mb-0">
          <a href="/oubli-mot-de-passe">Mot de passe oublié ?</a>
        </p>
      </section>
    </div>
  </form>
</FormWrapper>
