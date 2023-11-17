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
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
    integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
    crossorigin="anonymous"
  />
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
    integrity="sha384-4LISF5TTJX/fLmGSxO53rV4miRxdg84mZsxmO8Rx5jGtp/LbrixFETvWa5a6sESd"
    crossorigin="anonymous"
  />
  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
    crossorigin="anonymous"
  ></script>
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
