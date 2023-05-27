<script lang="ts">
  import { afterUpdate } from "svelte";
  import Header from "$components/Header.svelte";

  afterUpdate(() => {
    document.title = `${document.title} | Thionville Échecs — Équipes`;
  });
</script>

<div id="root">
  <div id="App">
    <Header />
    <main>
      <slot />
    </main>
  </div>
</div>

<style lang="scss" scoped>
  #root {
    font-family: Montserrat, "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif !important;
    -ms-overflow-style: none;
    scrollbar-width: none;
    background-color: hsl(0, 0%, 92%);
  }

  #root::-webkit-scrollbar {
    display: none;
  }

  #App {
    min-height: 100vh;
    max-width: 1200px;
    margin: 0 auto;
    background: white;
  }

  main {
    padding: 1em;
  }
</style>
