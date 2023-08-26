<script lang="ts">
  import FormLabel from "$components/form/FormLabel.svelte";

  export let id: string;
  export let value: string | number | null | undefined = null;
  export let placeholder: string | undefined = undefined;
  export let required = false;
  export let disabled = false;
  export let handleInput: ((e: Event) => void) | undefined = undefined;
</script>

<div class="h-100 d-flex flex-column">
  <FormLabel htmlFor={id} {required}>
    <slot />
  </FormLabel>
  <textarea
    {id}
    name={id}
    class="h-100 form-control"
    bind:value
    {required}
    {placeholder}
    {disabled}
    on:input={handleInput}
  />
</div>
