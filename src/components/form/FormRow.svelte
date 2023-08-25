<script lang="ts">
  export let marginBottom = 0;

  function setupAction(element: HTMLElement) {
    if (marginBottom > 0) element.classList.add(`mb-${marginBottom}`);
  }
</script>

<section class="row" use:setupAction>
  <slot />
</section>
