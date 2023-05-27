<script lang="ts">
  export let player: App.Player | null;
  export let handleSubmit: (data: App.Player) => void | Promise<void>;

  const data: App.Player = player
    ? structuredClone(player)
    : {
        ffeId: "",
        firstName: "",
        lastName: "",
        email: "",
        role: "USER",
      };
</script>

<form on:submit|preventDefault={() => handleSubmit(data)} />
