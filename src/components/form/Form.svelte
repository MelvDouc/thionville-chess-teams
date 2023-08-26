<script lang="ts">
  export let action: string | null = null;
  export let method: string | null = null;
  export let errors: string[] | null = null;
  export let handleSubmit: ((e: SubmitEvent) => void | Promise<void>) | null = null;

  function setupAction(form: HTMLFormElement) {
    if (action !== null) form.action = action;
    if (method !== null) form.method = method;
    if (handleSubmit)
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        handleSubmit!(e);
      });
  }
</script>

<form class="container d-flex flex-column gap-3 p-3" use:setupAction>
  <slot />
</form>

{#if errors}
  <ul>
    {#each errors as e}
      <li>{e}</li>
    {/each}
  </ul>
{/if}

<style lang="scss" scoped>
  form {
    $bg-clr1: hsl(181, 41%, 25%);
    $bg-clr2: hsl(181, 72%, 13%);
    margin: 0 auto 3em auto;
    border-radius: 10px;
    color: white;
    background: $bg-clr1;
    background: linear-gradient(to right, $bg-clr2, $bg-clr1);
  }
</style>
