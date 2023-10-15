<script lang="ts">
  import apiService from "$lib/services/api.service";
  import type { ApiResponse } from "$lib/types";

  $: hideLoader = true;

  async function updateRatings() {
    hideLoader = false;
    const response = await apiService.post<ApiResponse>({ url: "/joueurs/maj-elo" });
    hideLoader = true;

    if (!response?.success) {
      alert("La mise à jour des classements Elo a échoué.");
      return;
    }

    location.reload();
  }
</script>

<button class="btn btn-primary" on:click={updateRatings}>
  <span>Mettre à jour les Elo</span>
  <i class="loader bi bi-arrow-clockwise" class:d-none={hideLoader} />
</button>

<style lang="scss">
  .loader::before {
    animation: 500ms linear 0s infinite spin;
  }

  @keyframes spin {
    to {
      rotate: 360deg;
    }
  }
</style>
