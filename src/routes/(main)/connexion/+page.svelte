<script lang="ts">
  import FormGroup from "$components/FormGroup.svelte";
  import FormWrapper from "$components/FormWrapper.svelte";

  export let form: { errors: string[] } | undefined;
</script>

<svelte:head>
  <title>Connexion</title>
</svelte:head>

<FormWrapper errors={form?.errors ?? null}>
  <form class="form mb-3" method="POST">
    <div class="container d-flex flex-column gap-3 p-3">
      <section class="row">
        <div class="col-12">
          <FormGroup id="ffeId" required>Code FFE</FormGroup>
        </div>
      </section>
      <section class="row">
        <div class="col-12">
          <FormGroup id="pwd" type="password" required>Mot de passe</FormGroup>
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
</FormWrapper>
