<script lang="ts">
  export let errors: string[];
</script>

<ul class="mt-4">
  {#each errors as error}
    <li>{error}</li>
  {/each}
</ul>
