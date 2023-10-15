<script lang="ts">
  import LineupTable from "$components/LineupTable.svelte";
  import FormContainer from "$components/form/FormContainer.svelte";
  import FormErrors from "$components/form/FormErrors.svelte";
  import FormSubmitRow from "$components/form/FormSubmitRow.svelte";
  import { getDatePortion } from "$lib/services/date.service";
  import type { Match, PublicPlayer } from "$lib/types";

  export let players: PublicPlayer[];
  export let handleSubmit: (match: Match) => void | Promise<void>;
  export let errors: string[] | null;
  export let match: Match;

  function updateDate({ target }: Event) {
    const date = (target as HTMLInputElement).valueAsDate;
    if (date !== null) match.date = date;
  }
</script>

<form on:submit|preventDefault={() => handleSubmit(match)}>
  <FormContainer>
    <section class="row">
      <article class="col-12 col-sm-4">
        <label class="form-label required" for="season">Saison</label>
        <input
          class="form-control"
          type="number"
          id="season"
          placeholder="2023"
          bind:value={match.season}
          required
        />
      </article>
      <article class="col-12 col-sm-2">
        <label class="form-label required" for="round">Ronde</label>
        <input
          class="form-control"
          type="number"
          id="round"
          placeholder="1"
          min="1"
          bind:value={match.round}
          required
        />
      </article>
      <article class="col-12 col-sm-6">
        <label class="form-label required" for="date">Date</label>
        <input
          class="form-control"
          type="date"
          id="date"
          value={getDatePortion(match.date)}
          on:input={updateDate}
          required
        />
      </article>
    </section>
    <section class="row">
      <article class="col-12 col-sm-6">
        <label class="form-label required" for="opponent">Adversaire</label>
        <input
          class="form-control"
          type="text"
          id="opponent"
          bind:value={match.opponent}
          required
        />
      </article>
      <article class="col-12 col-sm-6">
        <label class="form-label required" for="teamName">Équipe</label>
        <input
          class="form-control"
          type="text"
          id="teamName"
          bind:value={match.teamName}
          required
        />
      </article>
    </section>
    <section class="row">
      <article class="col-12 col-sm-6 d-flex flex-column">
        <label class="form-label required" for="address">Adresse</label>
        <div class="flex-grow-1">
          <textarea id="address" class="h-100 form-control" bind:value={match.address} required />
        </div>
      </article>
      <article class="col-12 col-sm-6">
        <div class="mb-2">
          <label class="form-label required" for="city">Ville</label>
          <input class="form-control" type="text" id="city" bind:value={match.city} required />
        </div>
        <div>
          <label class="form-label required" for="zipCode">Code postal</label>
          <input
            class="form-control"
            type="text"
            id="zipCode"
            bind:value={match.zipCode}
            required
          />
        </div>
      </article>
    </section>
    <section class="row">
      <article class="col-12">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="whiteOnOdds"
            bind:checked={match.whiteOnOdds}
          />
          <label class="form-check-label" for="whiteOnOdds">Blancs aux échiquiers impairs</label>
        </div>
      </article>
    </section>
    <section class="row">
      <article class="col-12">
        <label class="form-label" for="lineup">Composition</label>
        <LineupTable {players} {match} />
      </article>
    </section>
    <FormSubmitRow />
  </FormContainer>
</form>

{#if errors}
  <FormErrors {errors} />
{/if}
