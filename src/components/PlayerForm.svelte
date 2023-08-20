<script lang="ts">
  import FormCheckbox from "$components/FormCheckbox.svelte";
  import FormGroup from "$components/FormGroup.svelte";
  import PlayerRole, { roleTranslations } from "$lib/PlayerRole.js";
  import { getDatePortion } from "$lib/date-formatter.js";

  export let player: App.Player | null;
  export let action: string;
  export let errors: string[] | null;
  export let userRole: App.PlayerRole;

  const roles = Object.entries(PlayerRole).reduce((acc, [key, value]) => {
    if (isNaN(+key)) acc.push([value as PlayerRole, roleTranslations[value as keyof object]]);
    return acc;
  }, [] as [PlayerRole, string][]);
</script>

<form class="form" {action} method="POST">
  <div class="container d-flex flex-column gap-3 p-3">
    <section class="row">
      <article class="col-12 col-sm-3">
        <FormGroup id="ffeId" value={player?.ffeId || ""} pattern="[A-Z]\d+" required
          >Code FFE</FormGroup
        >
      </article>
      <article class="col-12 col-sm-5">
        <FormGroup type="number" id="fideId" value={player?.fideId || ""}>N° FIDE</FormGroup>
      </article>
      <article class="col-12 col-sm-4">
        <FormGroup id="membership" value={player?.membership || ""}>Type d'adhérent</FormGroup>
      </article>
    </section>
    <section class="row">
      <article class="col-12 col-sm-4">
        <FormGroup id="firstName" value={player?.firstName || ""} required>Prénom</FormGroup>
      </article>
      <article class="col-12 col-sm-4">
        <FormGroup id="lastName" value={player?.lastName || ""} required>Nom de famille</FormGroup>
      </article>
      <article class="col-12 col-sm-4">
        <FormGroup
          type="date"
          id="birthDate"
          value={player?.birthDate ? getDatePortion(player.birthDate) : null}
          >Date de naissance</FormGroup
        >
      </article>
    </section>
    <section class="row">
      <article class="col-12 col-sm-9">
        <FormGroup type="email" id="email" value={player?.email || ""} required
          >Adresse email</FormGroup
        >
      </article>
      <article class="col-12 col-sm-3">
        <FormGroup type="number" id="rating" value={player?.rating || ""}>Elo</FormGroup>
      </article>
    </section>
    <section class="row">
      <article class="col-12 col-sm-3">
        <FormGroup id="phone1" value={player?.phone1 || ""}>Tél. 1</FormGroup>
      </article>
      <article class="col-12 col-sm-3">
        <FormGroup id="phone2" value={player?.phone2 || ""}>Tél. 2</FormGroup>
      </article>
      <article class="col-12 col-sm-3">
        <FormGroup id="team1" value={player?.team1 || ""}>Équipe 1</FormGroup>
      </article>
      <article class="col-12 col-sm-3">
        <FormGroup id="team2" value={player?.team2 || ""}>Équipe 2</FormGroup>
      </article>
    </section>
    <section class="row">
      <article class="col-12 col-sm-6">
        <div class="form-label">Sexe</div>
        <div class="flex align-items-center">
          <FormCheckbox id="genderMale" name="isMale" value="1" checked={!player || player.isMale}
            >♂️</FormCheckbox
          >
          <FormCheckbox id="genderFemale" name="isMale" value="0" checked={player?.isMale === false}
            >♀️</FormCheckbox
          >
        </div>
      </article>
      <article class="col-12 col-sm-6">
        <label for="role" class="form-label form-required">Rôle</label>
        <select id="role" name="role" class="form-select">
          {#each roles as [value, text]}
            {#if userRole <= value}
              <option {value} selected={player?.role === value}>{text}</option>
            {/if}
          {/each}
        </select>
      </article>
    </section>
    <section class="row">
      <div class="col-12 d-flex justify-content-center">
        <button type="submit" class="btn btn-primary">Valider</button>
      </div>
    </section>
  </div>
</form>

{#if errors}
  <ul>
    {#each errors as e}
      <li>{e}</li>
    {/each}
  </ul>
{/if}
