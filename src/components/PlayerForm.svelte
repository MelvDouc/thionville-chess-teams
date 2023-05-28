<script lang="ts">
  import FormGroup from "$components/FormGroup.svelte";
  import PlayerRoles from "$lib/PlayerRoles.js";

  export let player: App.Player | null;
  export let handleSubmit: (data: App.Player) => void | Promise<void>;

  // TODO: add optional fields
  const data: App.Player = player
    ? structuredClone(player)
    : {
        ffeId: "",
        firstName: "",
        lastName: "",
        email: "",
        role: "USER",
      };
</script>

<form on:submit|preventDefault={() => handleSubmit(data)}>
  <article class="form-row">
    <div class="form-group-6">
      <FormGroup id="ffe-id" bind:value={data.ffeId}>Code FFE</FormGroup>
    </div>
    <div class="form-group-6">
      <FormGroup id="fide-id" type="number" bind:value={data.fideId}>N° FIDE</FormGroup>
    </div>
  </article>
  <article class="form-row">
    <div class="form-group-6">
      <FormGroup id="first-name" bind:value={data.firstName}>Prénom</FormGroup>
    </div>
    <div class="form-group-6">
      <FormGroup id="last-name" bind:value={data.lastName}>NOM</FormGroup>
    </div>
  </article>
  <article class="form-row">
    <div class="form-group-6">
      <FormGroup id="email" type="email" bind:value={data.email}>Email</FormGroup>
    </div>
    <div class="form-group-6">
      <label for="role" class="form-required">Rôle</label>
      <select id="role" bind:value={data.role} required>
        {#each Object.values(PlayerRoles) as role}
          <option value={role} selected={data.role === role}>{role}</option>
        {/each}
      </select>
    </div>
  </article>
  <article class="form-submit">
    <button type="submit">Valider</button>
  </article>
</form>
