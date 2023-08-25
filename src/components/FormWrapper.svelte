<script lang="ts">
  export let errors: string[] | null;
</script>

<div class="formWrapper">
  <slot />
</div>

{#if errors}
  <ul>
    {#each errors as e}
      <li>{e}</li>
    {/each}
  </ul>
{/if}
