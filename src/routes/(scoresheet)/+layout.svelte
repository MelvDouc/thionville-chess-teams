<div id="root">
  <slot />
</div>

<style scoped>
  #root {
    --table-border: 1px solid black;
    max-width: 1200px;
    font-size: 0.95rem;
    margin-block: 2em;
    padding-inline: 1.5em;
    display: flex;
    flex-flow: column nowrap;
    gap: 2em;
    font-family: Arial, Verdana, Calibri, Geneva, Tahoma, "Source Sans Pro", sans-serif;
  }
</style>
