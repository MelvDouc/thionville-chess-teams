<script lang="ts">
  import FormWrapper from "$components/FormWrapper.svelte";

  export let form: App.Form;
</script>

<FormWrapper errors={form?.errors ?? null}>
  <form method="POST" />
</FormWrapper>
