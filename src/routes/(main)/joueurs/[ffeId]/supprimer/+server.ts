import { deletePlayer } from "$lib/server/models/player.model.js";

export async function DELETE({ locals: { user }, params: { ffeId } }) {
  if (!user)
    return new Response(
      JSON.stringify({ success: false })
    );

  const deleteResult = await deletePlayer(ffeId, user);
  return new Response(
    JSON.stringify({ success: !!deleteResult?.acknowledged })
  );
}