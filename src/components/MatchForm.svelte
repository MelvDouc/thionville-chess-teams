<script lang="ts">
  import FormWrapper from "$components/FormWrapper.svelte";
  import { getDatePortion } from "$lib/date-formatter.js";
  import lineupStore, { getEmptyLineUp } from "$lib/stores/lineup.store.js";
  import FormGroup from "./FormGroup.svelte";
  import LineUpTable from "./LineUpTable.svelte";

  export let match: WithId<App.Match> | null;
  export let players: App.PublicPlayer[];
  export let handleSubmit: (match: WithId<App.Match>) => void | Promise<void>;
  export let errors: string[] | null;

  const _id = match?._id ?? "";
  const data = match ?? {
    _id,
    season: new Date().getFullYear(),
    round: 1,
    teamName: "",
    opponent: "",
    address: "3 rue du cygne",
    city: "Thionville",
    zipCode: "57100",
    date: new Date(),
    whiteOnOdds: true,
    captainFfeId: "",
    lineup: getEmptyLineUp(),
    availableFfeIds: [],
  };

  lineupStore.set(data.lineup ?? getEmptyLineUp());
  lineupStore.subscribe((value) => (data.lineup = value));

  function updateDate({ target }: Event) {
    const newDate = (target as HTMLInputElement).valueAsDate;
    if (newDate) data.date = newDate;
  }
</script>

<FormWrapper {errors}>
  <form class="form" on:submit|preventDefault={() => handleSubmit(data)}>
    <div class="container d-flex flex-column gap-3 p-3">
      <section class="row">
        <article class="col-12 col-sm-4">
          <FormGroup id="season" type="number" placeholder="2023" bind:value={data.season} required
            >Saison</FormGroup
          >
        </article>
        <article class="col-12 col-sm-2">
          <FormGroup id="round" type="number" min={1} bind:value={data.round} required
            >Ronde</FormGroup
          >
        </article>
        <article class="col-12 col-sm-6">
          <FormGroup
            id="date"
            type="date"
            min={1}
            value={getDatePortion(data.date)}
            handleInput={updateDate}
            required>Date</FormGroup
          >
        </article>
      </section>
      <section class="row">
        <article class="col-12 col-sm-6">
          <FormGroup id="opponent" bind:value={data.opponent} required>Adversaire</FormGroup>
        </article>
        <article class="col-12 col-sm-6">
          <FormGroup id="teamName" placeholder="Thionville I" bind:value={data.teamName} required
            >Équipe</FormGroup
          >
        </article>
      </section>
      <section class="row">
        <article class="col-12 col-sm-7 d-flex flex-column">
          <label for="address" class="form-label form-required">Adresse</label>
          <textarea id="address" class="h-100 form-control" bind:value={data.address} required />
        </article>
        <article class="col-12 col-sm-5 d-flex flex-column gap-2">
          <div>
            <FormGroup id="city" bind:value={data.city} required>Ville</FormGroup>
          </div>
          <div>
            <FormGroup id="zipCode" bind:value={data.zipCode} required>Code postal</FormGroup>
          </div>
        </article>
      </section>
      <section class="row">
        <div class="col-12">
          <div class="form-check">
            <input
              type="checkbox"
              id="whiteOnOdds"
              bind:checked={data.whiteOnOdds}
              class="form-check-input"
            />
            <label for="whiteOnOdds" class="form-label">Blancs aux échiquiers impairs</label>
          </div>
        </div>
      </section>
      <section class="row">
        <article class="col-12">
          <div class="form-label">Composition</div>
          <LineUpTable
            {players}
            captainFfeId={data.captainFfeId}
            whiteOnOdds={data.whiteOnOdds}
            {lineupStore}
          />
        </article>
      </section>
      <section class="d-flex flex-wrap justify-content-center gap-2 pt-4">
        <button type="submit" class="btn btn-primary">Valider</button>
      </section>
    </div>
  </form>
</FormWrapper>

<style scoped>
  input[type="checkbox"] + label {
    user-select: none;
  }
</style>
