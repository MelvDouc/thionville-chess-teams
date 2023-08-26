<script lang="ts">
  export let submitText: string;
  export let backLink: string | null = null;
</script>

<div class="d-flex flex-wrap justify-content-center gap-2 pt-4">
  <button type="submit" class="btn btn-primary">{submitText}</button>
  {#if backLink}
    <a href={backLink} class="btn btn-danger">Annuler</a>
  {/if}
</div>
