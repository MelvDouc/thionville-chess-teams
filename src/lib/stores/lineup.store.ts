import { writable } from "svelte/store";

const lineUpStore = writable<MatchLineUp>();
const getEmptyLineUp = () => {
  const emptyLineUp = {} as MatchLineUp;

  for (let i = 1; i <= 8; i++)
    emptyLineUp[i] = null;

  return emptyLineUp;
};

export { getEmptyLineUp };
export default lineUpStore;

type MatchLineUp = App.Match["lineup"];