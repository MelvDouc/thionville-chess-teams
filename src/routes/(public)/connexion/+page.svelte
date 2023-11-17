<script lang="ts">
  import FormContainer from "$components/form/FormContainer.svelte";
  import FormErrors from "$components/form/FormErrors.svelte";
  import FormSubmitRow from "$components/form/FormSubmitRow.svelte";

  export let form: { errors: string[] } | never;
</script>

<svelte:head>
  <title>Connexion</title>
</svelte:head>

<form action="/connexion" method="POST">
  <FormContainer>
    <section class="row">
      <article class="col">
        <label class="form-label required" for="ffeId">Code FFE</label>
        <input class="form-control" type="text" name="ffeId" id="ffeId" required />
      </article>
    </section>
    <section class="row">
      <article class="col">
        <label class="form-label required" for="pwd">Mot de passe</label>
        <input class="form-control" type="password" name="pwd" id="pwd" required />
      </article>
    </section>
    <FormSubmitRow />
  </FormContainer>
</form>

<p class="mt-2"><a href="/oubli-mot-de-passe">Mot de passe oublié ?</a></p>

{#if form?.errors}
  <FormErrors errors={form.errors} />
{/if}
