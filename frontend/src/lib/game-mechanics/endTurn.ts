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
    // Draw tiles until player has 7 tiles, or no tiles remain in bag
    drawTiles(currentPlayerId)

    // TODO: If player still has 0 tiles after attempting to draw tiles, that means we have run out of tiles and the game should end
    // TODO: What other conditions do we need to check to determine whether the game should end?

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
