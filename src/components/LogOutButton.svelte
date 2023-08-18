<script lang="ts">
  export let user: App.User;

  function confirmLogOut({ target }: SubmitEvent) {
    if (
      confirm("Êtes-vous sûr(e) de vouloir vous déconnecter ?") &&
      target instanceof HTMLFormElement
    )
      target.submit();
  }
</script>

<form action="/deconnexion" method="POST" on:submit|preventDefault={confirmLogOut}>
  <input title="Se déconnecter" type="submit" value={user.ffeId} />
</form>

<style scoped>
  input {
    all: unset;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
</style>
