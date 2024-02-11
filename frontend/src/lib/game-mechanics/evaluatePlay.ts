import { gameStateSlice } from "../../redux-config/slices/gameState";
import { playerScoresSlice } from "../../redux-config/slices/playerScores";
import { tileGridSlice } from "../../redux-config/slices/tileGrid";
import { wordScoresSlice } from "../../redux-config/slices/wordScores";
import { useAppDispatch, useAppSelector } from "../../redux-config/store";
import { boardGrid } from "../game-constants/board";
import { calculateScore } from "./calculateScore";
import { scoreHorizontalPlay } from "./scoreHorizontalPlay";
import { scoreVerticalPlay } from "./scoreVerticalPlay";
import { useCurrentPlayer } from "./useCurrentPlayer";
import {
  getPlayedColumn,
  getPlayedRow,
  validatePlacement,
} from "./validatePlacement";

export function useEvaluatePlay() {
  const tileGrid = useAppSelector((state) => state.tileGrid);
  const playGrid = useAppSelector((state) => state.playGrid);
  const currentPlayerId = useCurrentPlayer();
  const turnNumber = useAppSelector(state => state.gameState.turnNumber)

  const dispatch = useAppDispatch();

  return (): boolean => {
    if (!validatePlacement(playGrid, tileGrid, turnNumber)) {
      console.log("Invalid play");
      dispatch(gameStateSlice.actions.setTurnState('invalid-placement'))
      return false;
    }        

    // Determine row in which tiles were played during current turn, assuming that a horizontal play was made
    const playedRow = getPlayedRow(playGrid);
    // Determine column in which tiles were played during current turn, assuming that a vertical play was made
    const playedColumn = getPlayedColumn(playGrid);

    // TODO: Check that all words formed are valid

    const wordScores =
      playedRow != -1
        ? scoreHorizontalPlay(tileGrid, playGrid, boardGrid, playedRow)
        : scoreVerticalPlay(tileGrid, playGrid, boardGrid, playedColumn);

    console.log(wordScores);
    console.log("Invalid words:");

    for (const wordScore of wordScores) {
      if (wordScore.score === -1) {
        console.log(wordScore.word);
        // TODO: Handle invalid word
        dispatch(gameStateSlice.actions.setTurnState('invalid-words'))
        return false
      }
    }

    // Confirm placement of tiles onto tileGrid. They will now be fixed.
    dispatch(tileGridSlice.actions.placeTiles(playGrid));
    // Update scores for words played during current turn
    dispatch(wordScoresSlice.actions.set(wordScores));
    // Update player scores
    dispatch(
      playerScoresSlice.actions.add({
        playerId: currentPlayerId,
        score: calculateScore(wordScores),
      })
    );

    dispatch(gameStateSlice.actions.setTurnState('valid'))
    // Reset skip counter
    dispatch(gameStateSlice.actions.resetSkips())
    return true;
  };
}
