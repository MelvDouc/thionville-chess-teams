<script lang="ts">
  export let checked = false;
  export let id: string;
</script>

<div class="form-check">
  <input type="checkbox" class="form-check-input" {id} bind:checked />
  <label for={id} class="form-label">
    <slot />
  </label>
</div>

<style scoped>
  input[type="checkbox"] + label {
    user-select: none;
  }
</style>
