import { gameStateSlice } from "../../redux-config/slices/gameState";
import { playGridSlice } from "../../redux-config/slices/playGrid";
import { wordScoresSlice } from "../../redux-config/slices/wordScores";
import { useAppDispatch } from "../../redux-config/store";

export function useEndGame() {
  const dispatch = useAppDispatch();

  return () => {
    console.log("Game ended");
    dispatch(gameStateSlice.actions.setGameProgress("post-game"));
    // Clear the playGrid
    dispatch(playGridSlice.actions.clear());
    // Clear word scores
    dispatch(wordScoresSlice.actions.clear());
  };
}
