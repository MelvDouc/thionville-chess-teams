<script lang="ts">
  import FormContainer from "$components/form/FormContainer.svelte";
  import FormErrors from "$components/form/FormErrors.svelte";
  import FormSubmitRow from "$components/form/FormSubmitRow.svelte";

  export let form:
    | { success: true; email: string }
    | { success: false; errors: string[] }
    | undefined;
</script>

<svelte:head>
  <title>Demande de réinitialisation du mot de passe</title>
</svelte:head>

{#if form?.success}
  <p>Un lien de réinitialisation vous a été envoyé à <strong>{form.email}</strong>.</p>
{:else}
  <form action="/@/oubli-mot-de-passe" method="POST">
    <FormContainer>
      <section class="row">
        <article class="col">
          <label class="form-label required" for="ffeId">Code FFE</label>
          <input class="form-control" type="text" name="ffeId" id="ffeId" required />
        </article>
      </section>
      <FormSubmitRow />
    </FormContainer>
  </form>

  {#if form?.errors}
    <FormErrors errors={form.errors} />
  {/if}
{/if}
