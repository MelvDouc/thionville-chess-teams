<script lang="ts">
  export let name: string;
  export let id: string;
  export let value: string;
  export let checked: boolean = false;
</script>

<div class="form-check">
  <input type="radio" class="form-check-input" {name} {id} {value} {checked} />
  <label for={id} class="form-check-label">
    <slot />
  </label>
</div>
