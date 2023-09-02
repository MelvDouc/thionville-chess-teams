<script lang="ts">
  import LineUpTable from "$components/LineupTable.svelte";
  import Form from "$components/form/Form.svelte";
  import FormCheckbox from "$components/form/FormCheckbox.svelte";
  import FormCol from "$components/form/FormCol.svelte";
  import FormGroup from "$components/form/FormGroup.svelte";
  import FormLabel from "$components/form/FormLabel.svelte";
  import FormRow from "$components/form/FormRow.svelte";
  import FormSubmit from "$components/form/FormSubmit.svelte";
  import FormTextarea from "$components/form/FormTextarea.svelte";
  import { getCurrentSeason, getDatePortion } from "$lib/date-formatter.js";
  import lineupStore, { getEmptyLineUp } from "$lib/stores/lineup.store.js";

  export let match: WithId<App.Match> | null;
  export let players: App.PublicPlayer[];
  export let handleSubmit: (match: WithId<App.Match>) => void | Promise<void>;
  export let errors: string[] | null;

  const _id = match?._id ?? "";
  const data = match ?? {
    _id,
    season: getCurrentSeason(),
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

<Form {errors} handleSubmit={() => handleSubmit(data)}>
  <FormRow>
    <FormCol cols={12} sm={4}>
      <FormGroup id="season" type="number" placeholder="2023" bind:value={data.season} required
        >Saison</FormGroup
      >
    </FormCol>
    <FormCol cols={12} sm={2}>
      <FormGroup id="round" type="number" min={1} bind:value={data.round} required>Ronde</FormGroup>
    </FormCol>
    <FormCol cols={12} sm={6}>
      <FormGroup
        id="date"
        type="date"
        min={1}
        value={getDatePortion(data.date)}
        handleInput={updateDate}
        required>Date</FormGroup
      >
    </FormCol>
  </FormRow>
  <FormRow>
    <FormCol sm={6}>
      <FormGroup id="opponent" bind:value={data.opponent} required>Adversaire</FormGroup>
    </FormCol>
    <FormCol sm={6}>
      <FormGroup id="teamName" placeholder="Thionville I" bind:value={data.teamName} required
        >Équipe</FormGroup
      >
    </FormCol>
  </FormRow>
  <FormRow>
    <FormCol cols={12} sm={6}>
      <FormTextarea id="address" bind:value={data.address} required>Adresse</FormTextarea>
    </FormCol>
    <FormCol cols={12} sm={6}>
      <div class="mb-2">
        <FormGroup id="city" bind:value={data.city} required>Ville</FormGroup>
      </div>
      <div>
        <FormGroup id="zipCode" bind:value={data.zipCode} required>Code postal</FormGroup>
      </div>
    </FormCol>
  </FormRow>
  <FormRow>
    <FormCol>
      <FormCheckbox id="whiteOnOdds" bind:checked={data.whiteOnOdds}
        >Blancs aux échiquiers impairs</FormCheckbox
      >
    </FormCol>
  </FormRow>
  <FormRow>
    <FormCol>
      <FormLabel>Composition</FormLabel>
      <LineUpTable
        {players}
        captainFfeId={data.captainFfeId}
        whiteOnOdds={data.whiteOnOdds}
        {lineupStore}
      />
    </FormCol>
  </FormRow>
  <FormRow>
    <FormSubmit submitText="Valider" />
  </FormRow>
</Form>
