<script lang="ts">
  import { afterUpdate } from "svelte";
  import Header from "$components/Header.svelte";
  import "$styles/main.scss";

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
