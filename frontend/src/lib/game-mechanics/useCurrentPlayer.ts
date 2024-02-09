import { useAppSelector } from "../../redux-config/store";

export function useCurrentPlayer(): 0 | 1 {
  return useAppSelector((state) =>
    state.gameState.turnNumber % 2 === 0 ? 0 : 1
  );
}
