<script lang="ts">
  import Form from "$components/form/Form.svelte";
  import FormCol from "$components/form/FormCol.svelte";
  import FormGroup from "$components/form/FormGroup.svelte";
  import FormLabel from "$components/form/FormLabel.svelte";
  import FormRadio from "$components/form/FormRadio.svelte";
  import FormRow from "$components/form/FormRow.svelte";
  import FormSelect from "$components/form/FormSelect.svelte";
  import FormSubmit from "$components/form/FormSubmit.svelte";
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

<Form method="POST" {action} {errors}>
  <FormRow>
    <FormCol sm={3}>
      <FormGroup id="ffeId" value={player?.ffeId || ""} pattern="[A-Z]\d+" required
        >Code FFE</FormGroup
      >
    </FormCol>
    <FormCol sm={5}
      ><FormGroup type="number" id="fideId" value={player?.fideId || ""}>N° FIDE</FormGroup
      ></FormCol
    >
    <FormCol sm={4}>
      <FormGroup id="membership" value={player?.membership || ""}>Type d'adhérent</FormGroup>
    </FormCol>
  </FormRow>
  <FormRow>
    <FormCol sm={4}>
      <FormGroup id="firstName" value={player?.firstName || ""} required>Prénom</FormGroup>
    </FormCol>
    <FormCol sm={4}>
      <FormGroup id="lastName" value={player?.lastName || ""} required>Nom de famille</FormGroup>
    </FormCol>
    <FormCol sm={4}>
      <FormGroup
        type="date"
        id="birthDate"
        value={player?.birthDate ? getDatePortion(player.birthDate) : null}
        >Date de naissance</FormGroup
      ></FormCol
    >
  </FormRow>
  <FormRow>
    <FormCol sm={8}>
      <FormGroup type="email" id="email" value={player?.email || ""} required
        >Adresse email</FormGroup
      ></FormCol
    >
    <FormCol sm={4}>
      <FormGroup type="number" id="rating" value={player?.rating || ""}>Elo</FormGroup>
    </FormCol>
  </FormRow>
  <FormRow>
    <FormCol sm={3}>
      <FormGroup id="phone1" value={player?.phone1 || ""}>Tél. 1</FormGroup>
    </FormCol>
    <FormCol sm={3}>
      <FormGroup id="phone2" value={player?.phone2 || ""}>Tél. 2</FormGroup>
    </FormCol>
    <FormCol sm={3}>
      <FormGroup id="team1" value={player?.team1 || ""}>Équipe 1</FormGroup>
    </FormCol>
    <FormCol sm={3}>
      <FormGroup id="team2" value={player?.team2 || ""}>Équipe 2</FormGroup>
    </FormCol>
  </FormRow>
  <FormRow>
    <FormCol sm={6}>
      <FormLabel htmlFor="isMale">Sexe</FormLabel>
      <div class="flex align-items-center">
        <FormRadio id="genderMale" name="isMale" value="1" checked={!player || player.isMale}
          >♂️</FormRadio
        >
        <FormRadio id="genderFemale" name="isMale" value="0" checked={player?.isMale === false}
          >♀️</FormRadio
        >
      </div>
    </FormCol>
    <FormCol sm={6}>
      <FormLabel htmlFor="role">Rôle</FormLabel>
      <FormSelect id="role" value={player?.role ?? PlayerRole.USER}>
        {#each roles as [value, text]}
          {#if userRole <= value}
            <option {value}>{text}</option>
          {/if}
        {/each}
      </FormSelect>
    </FormCol>
  </FormRow>
  <FormRow>
    <FormCol>
      <FormSubmit submitText="Valider" />
    </FormCol>
  </FormRow>
</Form>
