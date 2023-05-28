<script lang="ts">
  import PlusButton from "$components/PlusButton.svelte";
  export let data: { players: App.Player[] };
</script>

<section class="top">
  <PlusButton link="/joueurs/nouveau">Créer un joueur</PlusButton>
</section>

<table class="table">
  <thead>
    <tr>
      <th>Prénom NOM</th>
      <th>Code FFE</th>
      <th>N° FIDE</th>
      <th>Email</th>
      <th>Tél.</th>
      <th>Elo</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {#each data.players as { firstName, lastName, fideId, ffeId, email, phone1, rating }}
      <tr>
        <td>{firstName} {lastName}</td>
        <td>{ffeId}</td>
        <td>{fideId || ""}</td>
        <td>{email}</td>
        <td>{phone1 ?? ""}</td>
        <td>{rating}</td>
        <td>
          <div class="table__actions">
            <a href="/joueurs/{ffeId}/modifier" class="btn btn-primary">
              <i class="bi bi-pen-fill" />
            </a>
          </div>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style scoped>
  .top {
    margin-bottom: 2em;
  }
</style>
