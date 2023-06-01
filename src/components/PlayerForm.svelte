<script lang="ts">
  import PlayerRoles, { roleTranslations } from "$lib/PlayerRoles.js";

  export let player: App.Player | null;
  export let handleSubmit: (data: App.Player) => void | Promise<void>;

  const roles = Object.keys(PlayerRoles).map((key) => {
    return [
      PlayerRoles[key as keyof typeof PlayerRoles],
      roleTranslations[key as keyof typeof PlayerRoles],
    ];
  });

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

<form class="form" on:submit|preventDefault={() => handleSubmit(data)}>
  <div class="container d-flex flex-column gap-3 p-3">
    <section class="row">
      <article class="col-12 col-sm-3">
        <label for="ffe-id" class="form-label form-required">Code FFE</label>
        <input
          type="text"
          id="ffe-id"
          class="form-control"
          pattern="[A-Z]\d+"
          bind:value={data.ffeId}
          required
        />
      </article>
      <article class="col-12 col-sm-5">
        <label for="fide-id" class="form-label">N° FIDE</label>
        <input type="number" id="fide-id" class="form-control" bind:value={data.fideId} />
      </article>
      <article class="col-12 col-sm-4">
        <label for="membership" class="form-label">Type d'adhérent</label>
        <input type="text" id="membership" class="form-control" bind:value={data.membership} />
      </article>
    </section>
    <section class="row">
      <article class="col-12 col-sm-4">
        <label for="first-name" class="form-label form-required">Prénom</label>
        <input
          type="text"
          id="first-name"
          class="form-control"
          bind:value={data.firstName}
          required
        />
      </article>
      <article class="col-12 col-sm-4">
        <label for="last-name" class="form-label form-required">NOM</label>
        <input
          type="text"
          id="last-name"
          class="form-control"
          bind:value={data.lastName}
          required
        />
      </article>
      <article class="col-12 col-sm-4">
        <label for="birthdate" class="form-label">Date de naissance</label>
        <input type="date" id="birthdate" class="form-control" bind:value={data.birthDate} />
      </article>
    </section>
    <section class="row">
      <article class="col-12 col-sm-9">
        <label for="email" class="form-label form-required">Adresse email</label>
        <input type="email" id="email" class="form-control" bind:value={data.email} required />
      </article>
      <article class="col-12 col-sm-3">
        <label for="rating" class="form-label">Elo</label>
        <input type="number" id="rating" class="form-control" bind:value={data.rating} />
      </article>
    </section>
    <section class="row">
      <article class="col-12 col-sm-3">
        <label for="phone1" class="form-label">Tél. 1</label>
        <input type="text" id="phone1" class="form-control" bind:value={data.phone1} />
      </article>
      <article class="col-12 col-sm-3">
        <label for="phone2" class="form-label">Tél. 2</label>
        <input type="text" id="phone2" class="form-control" bind:value={data.phone2} />
      </article>
      <article class="col-12 col-sm-3">
        <label for="team1" class="form-label">Équipe 1</label>
        <input type="text" id="team1" class="form-control" bind:value={data.team1} />
      </article>
      <article class="col-12 col-sm-3">
        <label for="team2" class="form-label">Équipe 2</label>
        <input type="text" id="team2" class="form-control" bind:value={data.team2} />
      </article>
    </section>
    <section class="row">
      <article class="col-12 col-sm-6">
        <div class="form-label">Sexe</div>
        <div class="flex align-items-center">
          <div class="form-check">
            <input
              type="radio"
              class="form-check-input"
              name="gender"
              id="gender-male"
              bind:group={data.isMale}
              value={true}
            />
            <label for="gender-male" class="form-check-label">♂️</label>
          </div>
          <div class="form-check">
            <input
              type="radio"
              class="form-check-input"
              name="gender"
              id="gender-female"
              bind:group={data.isMale}
              value={false}
            />
            <label for="gender-female" class="form-check-label">♀️</label>
          </div>
        </div>
      </article>
      <article class="col-12 col-sm-6">
        <label for="role" class="form-label form-required">Rôle</label>
        <select id="role" class="form-select" bind:value={data.role}>
          {#each roles as [value, text]}
            <option {value}>{text}</option>
          {/each}
        </select>
      </article>
    </section>
  </div>
</form>
