<script lang="ts">
  import FormLabel from "$components/form/FormLabel.svelte";

  export let id: string;
  export let type = "text";
  export let value: string | number | null | undefined = null;
  export let checked: boolean | null | undefined = null;
  export let placeholder: string | undefined = undefined;
  export let pattern: string | undefined = undefined;
  export let min: number | undefined = undefined;
  export let required = false;
  export let disabled = false;
  export let handleInput: ((e: Event) => void) | undefined = undefined;

  function typeAction(element: HTMLInputElement) {
    element.type = type;
  }
</script>

<label for={id} class="form-label" class:form-required={required} />
<FormLabel htmlFor={id} {required}>
  <slot />
</FormLabel>
<input
  class="form-control"
  {id}
  name={id}
  {placeholder}
  {pattern}
  {min}
  {checked}
  {disabled}
  {required}
  use:typeAction
  bind:value
  on:input={handleInput}
/>
