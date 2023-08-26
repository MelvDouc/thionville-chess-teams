<script lang="ts">
  import FormGroup from "$components/form/FormGroup.svelte";
  import FormWrapper from "$components/FormWrapper.svelte";

  export let form: App.Form;
</script>

<svelte:head>
  <title>Mot de passe oublié</title>
</svelte:head>

{#if form?.success}
  <p>Un lien de réinitialisation vous a été envoyé par email.</p>
{:else}
  <FormWrapper errors={form?.errors ?? null}>
    <form method="POST" class="form">
      <div class="container d-flex flex-column gap-3 p-3">
        <section class="row mb-3">
          <div class="col-12">
            <FormGroup id="ffeId" required>Code FFE</FormGroup>
          </div>
        </section>
        <section class="row">
          <div class="col-12">
            <button class="btn btn-primary" type="submit">Valider</button>
          </div>
        </section>
      </div>
    </form>
  </FormWrapper>
{/if}
