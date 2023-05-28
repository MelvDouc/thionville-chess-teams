<script lang="ts">
  export let link: string;
</script>

<a href={link} class="btn btn-secondary">
  <i class="bi bi-plus-lg" />
  <span>
    <slot />
  </span>
</a>

<style scoped>
  a {
    gap: 0.5em;
  }
</style>
