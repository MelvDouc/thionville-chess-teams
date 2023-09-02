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
  import { getDatePortion } from "$lib/date-formatter.js";
  import matchStore from "$lib/stores/match.store.js";

  export let players: App.PublicPlayer[];
  export let handleSubmit: (match: WithId<App.Match>) => void | Promise<void>;
  export let errors: string[] | null;

  let match: WithId<App.Match>;

  matchStore.subscribe((prev) => (match = prev));

  function updateDate({ target }: Event) {
    const newDate = (target as HTMLInputElement).valueAsDate;
    if (newDate) {
      matchStore.update((prev) => ({
        ...prev,
        date: newDate,
      }));
    }
  }
</script>

<Form {errors} handleSubmit={() => handleSubmit(match)}>
  <FormRow>
    <FormCol cols={12} sm={4}>
      <FormGroup id="season" type="number" placeholder="2023" bind:value={match.season} required
        >Saison</FormGroup
      >
    </FormCol>
    <FormCol cols={12} sm={2}>
      <FormGroup id="round" type="number" min={1} bind:value={match.round} required>Ronde</FormGroup
      >
    </FormCol>
    <FormCol cols={12} sm={6}>
      <FormGroup
        id="date"
        type="date"
        min={1}
        value={getDatePortion(match.date)}
        handleInput={updateDate}
        required>Date</FormGroup
      >
    </FormCol>
  </FormRow>
  <FormRow>
    <FormCol sm={6}>
      <FormGroup id="opponent" bind:value={match.opponent} required>Adversaire</FormGroup>
    </FormCol>
    <FormCol sm={6}>
      <FormGroup id="teamName" placeholder="Thionville I" bind:value={match.teamName} required
        >Équipe</FormGroup
      >
    </FormCol>
  </FormRow>
  <FormRow>
    <FormCol cols={12} sm={6}>
      <FormTextarea id="address" bind:value={match.address} required>Adresse</FormTextarea>
    </FormCol>
    <FormCol cols={12} sm={6}>
      <div class="mb-2">
        <FormGroup id="city" bind:value={match.city} required>Ville</FormGroup>
      </div>
      <div>
        <FormGroup id="zipCode" bind:value={match.zipCode} required>Code postal</FormGroup>
      </div>
    </FormCol>
  </FormRow>
  <FormRow>
    <FormCol>
      <FormCheckbox id="whiteOnOdds" bind:checked={match.whiteOnOdds}>
        Blancs aux échiquiers impairs
      </FormCheckbox>
    </FormCol>
  </FormRow>
  <FormRow>
    <FormCol>
      <FormLabel>Composition</FormLabel>
      <LineUpTable {players} />
    </FormCol>
  </FormRow>
  <FormRow>
    <FormSubmit submitText="Valider" />
  </FormRow>
</Form>
