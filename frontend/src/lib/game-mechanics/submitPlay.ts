import { gameStateSlice } from "../../redux-config/slices/gameState";
import { playerScoresSlice } from "../../redux-config/slices/playerScores";
import { tileGridSlice } from "../../redux-config/slices/tileGrid";
import { useAppDispatch, useAppSelector } from "../../redux-config/store";
import { calculateScore } from "./calculateScore";
import { useEndTurn } from "./endTurn";
import { useCurrentPlayer } from "./useCurrentPlayer";

export function useSubmitPlay() {
  const dispatch = useAppDispatch();

  const playGrid = useAppSelector((state) => state.playGrid);
  const currentPlayerId = useCurrentPlayer();
  const wordScores = useAppSelector((state) => state.wordScores);

  const endTurn = useEndTurn();

  return () => {
    // Confirm placement of tiles onto tileGrid. They will now be fixed.
    dispatch(tileGridSlice.actions.placeTiles(playGrid));
    // Update player scores
    dispatch(
      playerScoresSlice.actions.add({
        playerId: currentPlayerId,
        score: calculateScore(wordScores),
      })
    );

    // Reset skip counter
    dispatch(gameStateSlice.actions.resetSkips());

    endTurn();
  };
}
