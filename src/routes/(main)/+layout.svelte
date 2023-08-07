<script lang="ts">
  import { afterUpdate } from "svelte";
  import Header from "$components/Header.svelte";
  import Footer from "$components/Footer.svelte";
  import "$styles/main.scss";

  const SITE_TITLE = "Thionville Échecs — Équipes";

  afterUpdate(() => {
    document.title = `${document.title} | ${SITE_TITLE}`;
  });
</script>

<svelte:head>
  <script src="/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
</svelte:head>

<div id="root">
  <div id="App">
    <Header title={SITE_TITLE} />
    <main>
      <div class="container-sm h-100 p-4">
        <slot />
      </div>
    </main>
    <Footer title={SITE_TITLE} />
  </div>
</div>

<style lang="scss">
  main {
    $clr1: rgb(255, 255, 255, 0.85);
    $clr2: rgb(255, 255, 255, 0.9);
    padding-bottom: 250px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-image: linear-gradient(to bottom, $clr1, $clr2), url("/img/chess-bg.jpg");
  }
</style>
