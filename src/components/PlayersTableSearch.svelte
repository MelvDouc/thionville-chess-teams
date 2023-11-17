<script lang="ts">
  export let value: string;
</script>

<div class="mb-3">
  <input type="search" placeholder="Chercher un joueur..." bind:value />
  <button class:d-none={!value} on:click={() => (value = "")}>
    <i class="bi bi-x" />
  </button>
</div>

<style lang="scss">
  div {
    --input-width: min(100%, 500px);
    position: relative;
  }

  input {
    width: var(--input-width);
  }

  button {
    all: unset;
    display: none;
    position: absolute;
    top: 50%;
    left: var(--input-width);
    translate: -125% -50%;
    cursor: pointer;
    transition: 0.265s ease-in;

    &:hover,
    &:active,
    &:focus {
      color: red;
      scale: 1.4;
    }
  }

  @media only screen and (width >= 180px) {
    button {
      display: inline-block;
    }
  }
</style>
