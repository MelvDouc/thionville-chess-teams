<script lang="ts">
  import FormContainer from "$components/form/FormContainer.svelte";
  import FormErrors from "$components/form/FormErrors.svelte";
  import FormSubmitRow from "$components/form/FormSubmitRow.svelte";
  import PlayerRole, { roleTranslations } from "$lib/PlayerRole";
  import type { PublicPlayer } from "$lib/types";

  export let handleSubmit: (player: PublicPlayer) => void | Promise<void>;
  export let errors: string[] | null;
  export let userRole: PlayerRole;
  export let player: PublicPlayer;
  export let isUpdate = false;

  const roles = Object.values(PlayerRole).reduce((acc, value) => {
    if (typeof value === "number") acc.push([value, roleTranslations[value]]);
    return acc;
  }, [] as [number, string][]);

  function setMale({ target }: Event) {
    player.isMale = (target as HTMLInputElement).checked;
  }

  function setFemale({ target }: Event) {
    player.isMale = !(target as HTMLInputElement).checked;
  }
</script>

<form on:submit|preventDefault={() => handleSubmit(player)}>
  <FormContainer>
    <section class="row">
      <article class="col-12 col-sm-3">
        <label class="form-label required" for="ffeId">Code FFE</label>
        <input
          type="text"
          class="form-control"
          id="ffeId"
          pattern="[A-Z]\d+"
          bind:value={player.ffeId}
          required
          disabled={isUpdate}
        />
      </article>
      <article class="col-12 col-sm-5">
        <label for="fideId" class="form-label">N° FIDE</label>
        <input type="number" class="form-control" id="fideId" bind:value={player.fideId} />
      </article>
      <article class="col-12 col-sm-4">
        <label class="form-label" for="membership">Type d'adhérent</label>
        <input type="text" class="form-control" id="membership" bind:value={player.membership} />
      </article>
    </section>
    <section class="row">
      <article class="col-12 col-sm-4">
        <label class="form-label required" for="firstName">Prénom</label>
        <input
          type="text"
          class="form-control"
          id="firstName"
          bind:value={player.firstName}
          required
        />
      </article>
      <article class="col-12 col-sm-4">
        <label class="form-label required" for="lastName">Nom de famille</label>
        <input
          type="text"
          class="form-control"
          id="lastName"
          bind:value={player.lastName}
          required
        />
      </article>
      <article class="col-12 col-sm-4">
        <label class="form-label" for="birthDate">Date de naissance</label>
        <input type="date" id="birthDate" class="form-control" bind:value={player.birthDate} />
      </article>
    </section>
    <section class="row">
      <article class="col-12 col-sm-8">
        <label class="form-label required" for="email">Email</label>
        <input type="email" class="form-control" id="email" bind:value={player.email} required />
      </article>
      <article class="col-12 col-sm-4">
        <label class="form-label" for="rating">Elo</label>
        <input type="number" class="form-control" id="rating" bind:value={player.rating} />
      </article>
    </section>
    <section class="row">
      <article class="col-12 col-sm-3">
        <label class="form-label" for="phone1">Tél. 1</label>
        <input type="text" class="form-control" id="phone1" bind:value={player.phone1} />
      </article>
      <article class="col-12 col-sm-3">
        <label class="form-label" for="phone2">Tél. 2</label>
        <input type="text" class="form-control" id="phone2" bind:value={player.phone2} />
      </article>
      <article class="col-12 col-sm-3">
        <label class="form-label" for="team1">Équipe 1</label>
        <input type="text" class="form-control" id="team1" bind:value={player.team1} />
      </article>
      <article class="col-12 col-sm-3">
        <label class="form-label" for="team2">Équipe 2</label>
        <input type="text" class="form-control" id="team2" bind:value={player.team2} />
      </article>
    </section>
    <section class="row">
      <article class="col-12 col-sm-6">
        <label for="isMale" class="form-label">Sexe</label>
        <div class="flex align-items-center">
          <div>
            <input
              type="radio"
              id="genderMale"
              name="isMale"
              class="form-check-input"
              on:change={setMale}
              checked={player.isMale}
            />
            <label for="genderMale" class="form-check-label">♂️</label>
          </div>
          <div>
            <input
              type="radio"
              id="genderFemale"
              name="isMale"
              class="form-check-input"
              on:change={setFemale}
              checked={!player.isMale}
            />
            <label for="genderFemale" class="form-check-label">♀️</label>
          </div>
        </div>
      </article>
      <article class="col-12 col-sm-6">
        <label class="form-label required" for="role">Rôle</label>
        <select class="form-control" id="role" bind:value={player.role} required>
          {#each roles as [value, text]}
            {#if userRole <= value}
              <option {value}>{text}</option>
            {/if}
          {/each}
        </select>
      </article>
    </section>
    <FormSubmitRow />
  </FormContainer>
</form>

{#if errors}
  <FormErrors {errors} />
{/if}
