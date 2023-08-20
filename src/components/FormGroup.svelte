<script lang="ts">
  export let id: string;
  export let type = "text";
  export let value: string | number | null | undefined = null;
  export let checked: boolean | null | undefined = null;
  export let placeholder: string | undefined = undefined;
  export let pattern: string | undefined = undefined;
  export let required = false;
  export let disabled = false;
</script>

<label for={id} class="form-label" class:form-required={required}>
  <slot />
</label>
<input
  class="form-control"
  {type}
  {id}
  {placeholder}
  {pattern}
  {value}
  {checked}
  {disabled}
  {required}
/>
