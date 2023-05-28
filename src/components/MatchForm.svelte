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
  <article class="form-row">
    <div class="form-group-3">
      <label for="season" class="form-required">Saison</label>
      <input type="number" id="season" bind:value={season} required />
    </div>
    <div class="form-group-4">
      <label for="round" class="form-required">Ronde</label>
      <input type="number" id="round" bind:value={round} required />
    </div>
    <div class="form-group-5">
      <label for="date" class="form-required">Date</label>
      <input type="date" id="date" value={getDatePortion(date)} on:input={updateDate} required />
    </div>
  </article>
  <article class="form-row">
    <div class="form-group-6">
      <label for="opponent" class="form-required">Adversaire</label>
      <input type="string" id="opponent" bind:value={opponent} required />
    </div>
    <div class="form-group-6">
      <label for="team-name" class="form-required">Équipe</label>
      <input type="string" id="team-name" placeholder="Thionville I" bind:value={teamName} required />
    </div>
  </article>
  <article class="form-row">
    <div class="form-group-6">
      <label for="address" class="form-required">Adresse</label>
      <textarea id="address" bind:value={address} required />
    </div>
    <div class="form-group-6">
      <div>
        <label for="city" class="form-required">Ville</label>
        <input type="text" id="city" bind:value={city} required />
      </div>
      <div>
        <label for="zip-code" class="form-required">Ville</label>
        <input type="number" id="zip-code" bind:value={zipCode} required />
      </div>
    </div>
  </article>
  <article class="form-row">
    <div class="form-group-12">
      <input type="checkbox" id="white-on-odds" bind:checked={whiteOnOdds} />
      <label for="white-on-odds">Blancs aux échiquiers impairs</label>
    </div>
  </article>
  <article class="form-row">
    <LineUpTable {captainFfeId} {lineUpStore} {whiteOnOdds} {players} />
  </article>
  <article class="form-submit">
    <button type="submit">Valider</button>
  </article>
</form>
