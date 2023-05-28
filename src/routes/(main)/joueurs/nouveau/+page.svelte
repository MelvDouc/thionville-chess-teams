<script lang="ts">
  import PlayerForm from "$components/PlayerForm.svelte";
  import { create } from "$lib/api.js";
</script>

<PlayerForm
  player={null}
  handleSubmit={async (data) => {
    const createResult = await create("players", data);
    console.log(createResult);
  }}
  isUpdate={false}
/>
