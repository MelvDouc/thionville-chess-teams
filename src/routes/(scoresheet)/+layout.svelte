<div id="root">
  <slot />
</div>

<style>
  :root {
    --table-border: 1px solid black;
  }

  *,
  ::before,
  ::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #root {
    font-size: 0.95rem;
    padding-inline: 1.5em;
    display: flex;
    flex-flow: column nowrap;
    gap: 2em;
    font-family: Arial, Verdana, Calibri, Geneva, Tahoma, "Source Sans Pro", sans-serif;
  }

  @page {
    size: a4 landscape;
    margin: 0;
  }
</style>
