<script lang="ts">
  import FormGroup from "$components/FormGroup.svelte";

  export let player: App.Player | null;
  export let handleSubmit: (data: App.Player) => void | Promise<void>;

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
      <label for="ffe-id" class="form-required">Code FFE</label>
      <input type="text" id="ffe-id" pattern="A-Z\d+" bind:value={data.ffeId} required />
    </div>
    <div class="form-group-6">
      <label for="fide-id">Code FFE</label>
      <input type="number" id="fide-id" bind:value={data.fideId} />
    </div>
  </article>
  <article class="form-row">
    <div class="form-group-6">
      <label for="first-name" class="form-required">Prénom</label>
      <input type="text" id="first-name" bind:value={data.firstName} required />
    </div>
    <div class="form-group-6">
      <label for="last-name" class="form-required">NOM</label>
      <input type="text" id="last-name" bind:value={data.lastName} required />
    </div>
  </article>
  <article class="form-row">
    <div class="form-group-6">
      <FormGroup id="email" type="email" bind:value={data.email} />
    </div>
    <div class="form-group-6">
      <label for="role" class="form-required">Rôle</label>
      <select id="role" bind:value={data.role} required>
        <option value="ADMIN" selected={data.role === "ADMIN"}>Admin</option>
        <option value="USER" selected={data.role === "USER"}>Utilisateur</option>
      </select>
    </div>
  </article>
  <article class="form-submit">
    <button type="submit">Valider</button>
  </article>
</form>
