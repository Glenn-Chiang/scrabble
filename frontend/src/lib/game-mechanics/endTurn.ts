import { gameStateSlice } from "../../redux-config/slices/gameState";
import { playGridSlice } from "../../redux-config/slices/playGrid";
import { wordScoresSlice } from "../../redux-config/slices/wordScores";
import { useAppDispatch } from "../../redux-config/store";
import { useDrawTiles } from "./drawTiles";
import { useCurrentPlayer } from "./useCurrentPlayer";

export function useEndTurn() {
  const dispatch = useAppDispatch();
  const drawTiles = useDrawTiles()
  const currentPlayerId = useCurrentPlayer()

  return () => {
    // Draw tiles for current player to prepare for their next turn
    drawTiles(currentPlayerId)
    // Clear the playGrid
    dispatch(playGridSlice.actions.clear());
    // Clear word scores
    dispatch(wordScoresSlice.actions.clear());
    // Advance to next turn
    dispatch(gameStateSlice.actions.nextTurn());
    // Reset turnState to pending
    dispatch(gameStateSlice.actions.setTurnState('pending'))
  };
}
