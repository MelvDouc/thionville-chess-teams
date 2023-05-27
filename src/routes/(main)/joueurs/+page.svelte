<script lang="ts">
  export let data: { players: App.Player[] };
</script>

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
          <a href="/joueurs/{ffeId}/modifier">Modifier</a>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
