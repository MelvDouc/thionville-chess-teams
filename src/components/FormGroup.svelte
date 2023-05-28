<script lang="ts">
  export let id: string;
  export let type = "text";
  export let required = true;
  export let value: string | number | null | undefined;
  export let placeholder: string | undefined = undefined;
  export let pattern: string | undefined = undefined;
</script>

<label for={id} class:form-required={required}>
  <slot />
</label>
<input {type} {id} {placeholder} {pattern} {value} {required} />
