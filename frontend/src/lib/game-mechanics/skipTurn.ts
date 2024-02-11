import { gameStateSlice } from "../../redux-config/slices/gameState";
import { useAppDispatch, useAppSelector } from "../../redux-config/store";
import { useEndTurn } from "./endTurn";
import { useEndGame } from "./endGame";

export function useSkipTurn() {
  const dispatch = useAppDispatch();
  const endTurn = useEndTurn();
  const endGame = useEndGame();

  const consecutiveSkips = useAppSelector(
    (state) => state.gameState.consecutiveSkips
  );

  return () => {
    // If the players skip their turn too many times in a row, end the game
    const maxSkips = 4;
    if (consecutiveSkips === maxSkips) {
      endGame();
    }
    dispatch(gameStateSlice.actions.addSkip());
    endTurn();
  };
}
