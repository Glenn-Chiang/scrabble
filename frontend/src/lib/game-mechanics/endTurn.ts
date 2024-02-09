import { gameStateSlice } from "../../redux-config/slices/gameState";
import { playGridSlice } from "../../redux-config/slices/playGrid";
import { wordScoresSlice } from "../../redux-config/slices/wordScores";
import { useAppDispatch } from "../../redux-config/store";

export function useEndTurn() {
  const dispatch = useAppDispatch();

  return () => {
    // Clear the playGrid
    dispatch(playGridSlice.actions.clear());
    // Clear word scores
    dispatch(wordScoresSlice.actions.clear());
    // Advance to next turn
    dispatch(gameStateSlice.actions.nextTurn());
  };
}
