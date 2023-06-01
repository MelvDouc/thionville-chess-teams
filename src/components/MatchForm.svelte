<script lang="ts">
  import lineUpStore, { getEmptyLineUp } from "$lib/stores/lineup-store.js";
  import { getDatePortion } from "$lib/date-formatter.js";
  import LineUpTable from "$components/LineUpTable.svelte";

  export let match: (App.Match & { _id: string }) | null;
  export let players: Omit<App.Player, "pwd" | "pwdResetId">[];
  export let handleSubmit: (match: App.Match & { _id: string }) => void | Promise<void>;
  const _id = match?._id ?? "";
  let season = match?.season ?? 2023,
    round = match?.round ?? 1,
    date = match ? new Date(match.date) : new Date(),
    opponent = match?.opponent ?? "",
    teamName = match?.teamName ?? "",
    address = match?.address ?? "",
    city = match?.city ?? "",
    zipCode = match?.zipCode ?? "",
    whiteOnOdds = !!match?.whiteOnOdds,
    captainFfeId = match?.captainFfeId ?? null;

  lineUpStore.set(match?.lineUp ?? getEmptyLineUp());

  function updateDate({ target }: Event) {
    const newDate = (target as HTMLInputElement).valueAsDate;
    if (newDate) date = newDate;
  }
</script>

<form
  class="form"
  on:submit|preventDefault={() =>
    handleSubmit({
      _id,
      season,
      round,
      date: new Date(date),
      opponent: opponent.trim(),
      teamName: teamName.trim(),
      address: address.trim(),
      city: city.trim(),
      zipCode: zipCode.trim(),
      whiteOnOdds,
      lineUp: $lineUpStore,
      captainFfeId,
    })}
>
  <div class="container d-flex flex-column gap-3 p-3">
    <section class="row">
      <article class="col-12 col-sm-4">
        <label for="season" class="form-label form-required">Saison</label>
        <input type="number" id="season" class="form-control" bind:value={season} required />
      </article>
      <article class="col-12 col-sm-3">
        <label for="round" class="form-label form-required">Ronde</label>
        <input type="number" id="round" class="form-control" min={1} bind:value={round} required />
      </article>
      <article class="col-12 col-sm-5">
        <label for="date" class="form-label form-required">Date</label>
        <input
          type="date"
          id="date"
          class="form-control"
          min={1}
          value={getDatePortion(date)}
          on:input={updateDate}
          required
        />
      </article>
    </section>
    <section class="row">
      <article class="col-12 col-sm-6">
        <label for="opponent" class="form-label form-required">Adversaire</label>
        <input type="text" id="opponent" class="form-control" bind:value={opponent} required />
      </article>
      <article class="col-12 col-sm-6">
        <label for="team-name" class="form-label form-required">Équipe</label>
        <input
          type="text"
          id="team-name"
          placeholder="Thionville I"
          class="form-control"
          bind:value={teamName}
          required
        />
      </article>
    </section>
    <section class="row">
      <article class="col-12 col-sm-7 d-flex flex-column">
        <label for="address" class="form-label form-required">Adresse</label>
        <textarea id="address" class="h-100 form-control" bind:value={address} required />
      </article>
      <article class="col-12 col-sm-5 d-flex flex-column gap-2">
        <div>
          <label for="city" class="form-label form-required">Ville</label>
          <input type="text" id="city" class="form-control" bind:value={city} required />
        </div>
        <div>
          <label for="zip-code" class="form-label form-required">Code postal</label>
          <input type="text" id="zip-code" class="form-control" bind:value={city} required />
        </div>
      </article>
    </section>
    <section class="row">
      <article class="col-12">
        <div class="form-label">Composition</div>
        <LineUpTable {captainFfeId} {players} {whiteOnOdds} {lineUpStore} />
      </article>
    </section>
    <section class="d-flex flex-wrap justify-content-center gap-2 pt-4">
      <button type="submit" class="btn btn-primary">Valider</button>
    </section>
  </div>
</form>
