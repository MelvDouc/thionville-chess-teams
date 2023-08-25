<script lang="ts">
  export let cols = 12;
  export let sm: number | null = null;

  function setupAction(element: HTMLElement) {
    if (sm !== null) element.classList.add(`col-sm-${sm}`);
  }
</script>

<article class="col-{cols}" use:setupAction>
  <slot />
</article>
