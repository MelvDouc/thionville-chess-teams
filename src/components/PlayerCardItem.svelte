<script lang="ts">
  export let title: string;
</script>

<div class="playerCard">
  <h3>{title}</h3>
  <p><slot /></p>
</div>

<style lang="scss">
  .playerCard {
    break-inside: avoid-column;
  }

  h3 {
    margin-bottom: 0.5rem;
  }
</style>
