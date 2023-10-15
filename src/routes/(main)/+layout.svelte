<script lang="ts">
  import Footer from "$components/Footer.svelte";
  import Header from "$components/Header.svelte";
  import type { User } from "$lib/types";
  import "$styles/main.scss";
  import { afterUpdate } from "svelte";

  export let data: { user: User | null };
  const SITE_TITLE = "Thionville Échecs — Équipes";

  afterUpdate(() => {
    document.title = `${document.title} | ${SITE_TITLE}`;
  });
</script>

<svelte:head>
  <script src="/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
</svelte:head>

<Header title={SITE_TITLE} user={data.user} />
<main>
  <div class="container-sm h-100 p-4">
    <slot />
  </div>
</main>
<Footer title={SITE_TITLE} />

<style lang="scss">
  main {
    $clr1: rgb(255, 255, 255, 0.85);
    $clr2: rgb(255, 255, 255, 0.9);
    min-height: 100vh;
    padding-bottom: 250px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-image: linear-gradient(to bottom, $clr1, $clr2), url("/img/chess-bg.jpg");
  }
</style>
