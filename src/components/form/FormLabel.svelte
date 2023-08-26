<script lang="ts">
  export let required = false;
  export let htmlFor: string | null = null;
</script>

<label class="form-label" class:form-required={required} for={htmlFor}>
  <slot />
</label>

<style lang="scss" scoped>
  .form-required {
    &::after {
      content: "*";
      display: inline-block;
      margin-inline-start: 0.33em;
      transform: scale(1.2, 1.5);
      color: red;
    }
  }
</style>
