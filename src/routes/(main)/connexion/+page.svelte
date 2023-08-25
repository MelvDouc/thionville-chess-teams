<script lang="ts">
  import Form from "$components/form/Form.svelte";
  import FormCol from "$components/form/FormCol.svelte";
  import FormGroup from "$components/form/FormGroup.svelte";
  import FormRow from "$components/form/FormRow.svelte";
  import FormSubmit from "$components/form/FormSubmit.svelte";

  export let form: App.Form;
</script>

<svelte:head>
  <title>Connexion</title>
</svelte:head>

<Form method="POST" errors={form?.errors ?? null}>
  <FormRow>
    <FormCol>
      <FormGroup id="ffeId" required>Code FFE</FormGroup>
    </FormCol>
  </FormRow>
  <FormRow>
    <FormCol>
      <FormGroup id="pwd" type="password" required>Mot de passe</FormGroup>
    </FormCol>
  </FormRow>
  <FormRow>
    <FormCol>
      <FormSubmit submitText="Se connecter" />
    </FormCol>
  </FormRow>
  <FormRow>
    <p class="mb-0">
      <a href="/oubli-mot-de-passe">Mot de passe oublié ?</a>
    </p>
  </FormRow>
</Form>
