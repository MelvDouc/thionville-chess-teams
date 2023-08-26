<script lang="ts">
  export let id: string;
  export let value: string | number | null | undefined = null;
</script>

<select name={id} {id} class="form-select" bind:value>
  <slot />
</select>
