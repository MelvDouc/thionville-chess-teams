<script lang="ts">
  import FormContainer from "$components/form/FormContainer.svelte";
  import FormErrors from "$components/form/FormErrors.svelte";
  import FormSubmitRow from "$components/form/FormSubmitRow.svelte";
  import type { ApiResponse } from "$lib/types";

  export let form: ApiResponse | never;

  function setAction(form: HTMLFormElement) {
    form.action = location.href;
  }
</script>

<svelte:head>
  <title>Changement de mot de passe</title>
</svelte:head>

{#if form?.success}
  <p>
    Votre mot de passe a bien été mis à jour. Vous pouvez désormais <a href="/@/connexion"
      >vous connecter</a
    >.
  </p>
{:else}
  <form use:setAction method="POST">
    <FormContainer>
      <section class="row">
        <article class="col">
          <label class="form-label required" for="email">Email</label>
          <input class="form-control" type="email" name="email" id="email" required />
        </article>
      </section>
      <section class="row">
        <article class="col">
          <label class="form-label required" for="pwd">Nouveau mot de passe</label>
          <input class="form-control" type="password" name="pwd" id="pwd" required />
        </article>
      </section>
      <section class="row">
        <article class="col">
          <label class="form-label required" for="pwd2">Confirmer nouveau mot de passe</label>
          <input class="form-control" type="password" name="pwd2" id="pwd2" required />
        </article>
      </section>
      <FormSubmitRow />
    </FormContainer>
  </form>

  {#if form?.errors}
    <FormErrors errors={form.errors} />
  {/if}
{/if}
