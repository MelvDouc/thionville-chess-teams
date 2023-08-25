<script lang="ts">
  import Form from "$components/form/Form.svelte";
  import FormCol from "$components/form/FormCol.svelte";
  import FormGroup from "$components/form/FormGroup.svelte";
  import FormRow from "$components/form/FormRow.svelte";
  import FormSubmit from "$components/form/FormSubmit.svelte";

  export let form: App.Form;
</script>

{#if form?.success}
  <p>
    Votre mot de passe a bien été mis à jour. Vous pouvez <a href="/connexion">vous connecter</a>.
  </p>
{:else}
  <Form method="POST" errors={form?.errors ?? null}>
    <FormRow>
      <FormCol>
        <FormGroup id="pwd" type="password" required>Nouveau mot de passe</FormGroup>
      </FormCol>
    </FormRow>
    <FormRow>
      <FormCol>
        <FormGroup id="pwd2" type="password" required>Confirmer le mot de passe</FormGroup>
      </FormCol>
    </FormRow>
    <FormRow>
      <FormCol>
        <FormSubmit submitText="Valider" />
      </FormCol>
    </FormRow>
  </Form>
{/if}
