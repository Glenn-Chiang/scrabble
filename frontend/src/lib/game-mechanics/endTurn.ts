import { gameStateSlice } from "../../redux-config/slices/gameState";
import { playGridSlice } from "../../redux-config/slices/playGrid";
import { wordScoresSlice } from "../../redux-config/slices/wordScores";
import { useAppDispatch, useAppSelector } from "../../redux-config/store";
import { rackLimit } from "../game-constants/tiles";
import { useDrawTiles } from "./drawTiles";
import { useEndGame } from "./endGame";
import { useCurrentPlayer } from "./useCurrentPlayer";

export function useEndTurn() {
  const dispatch = useAppDispatch();
  const drawTiles = useDrawTiles();
  const currentPlayerId = useCurrentPlayer();
  const playerTiles = useAppSelector(
    (state) => state.playerTiles[currentPlayerId]
  );

  const endGame = useEndGame();

  return () => {
    // Draw tiles until rack limit is reached, or no tiles remain in bag
    const drawnTiles = drawTiles(
      currentPlayerId,
      rackLimit - playerTiles.length
    );
    const numberOfTilesDrawn = Object.keys(drawnTiles).length;

    // If player has 0 tiles left after the play and there are no tiles left in the tile bag to be drawn, end the game
    if (playerTiles.length === 0 && numberOfTilesDrawn === 0) {
      endGame();
    }

    // Clear the playGrid
    dispatch(playGridSlice.actions.clear());
    // Clear word scores
    dispatch(wordScoresSlice.actions.clear());
    // Advance to next turn
    dispatch(gameStateSlice.actions.nextTurn());
    // Reset turnState to pending
    dispatch(gameStateSlice.actions.setTurnState("pending"));
  };
}
