<script lang="ts">
  export let mainText: string;
</script>

<li class="nav-item dropdown">
  <a
    class="nav-link dropdown-toggle"
    href="#top"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    {mainText}
  </a>
  <ul class="dropdown-menu">
    <slot />
  </ul>
</li>
