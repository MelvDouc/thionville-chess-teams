<script lang="ts">
  import Form from "$components/form/Form.svelte";
  import FormCol from "$components/form/FormCol.svelte";
  import FormGroup from "$components/form/FormGroup.svelte";
  import FormRow from "$components/form/FormRow.svelte";
  import FormSubmit from "$components/form/FormSubmit.svelte";

  export let form: App.Form;
</script>

<svelte:head>
  <title>Mot de passe oublié</title>
</svelte:head>

{#if form?.success}
  <p>Un lien de réinitialisation vous a été envoyé par email.</p>
{:else}
  <Form method="POST" errors={form?.errors ?? null}>
    <FormRow>
      <FormCol>
        <FormGroup id="ffeId" required>Code FFE</FormGroup>
      </FormCol>
    </FormRow>
    <FormRow>
      <FormCol>
        <FormSubmit submitText="Valider" />
      </FormCol>
    </FormRow>
  </Form>
{/if}
