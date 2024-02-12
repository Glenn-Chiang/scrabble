import { gameStateSlice } from "../../redux-config/slices/gameState";
import { invalidWordsSlice } from "../../redux-config/slices/invalidWords";
import { wordScoresSlice } from "../../redux-config/slices/wordScores";
import { useAppDispatch, useAppSelector } from "../../redux-config/store";
import { boardGrid } from "../game-constants/board";
import { scoreHorizontalPlay } from "./scoreHorizontalPlay";
import { scoreVerticalPlay } from "./scoreVerticalPlay";
import {
  getPlayedColumn,
  getPlayedRow,
  validatePlacement,
} from "./validatePlacement";
import { validateWord } from "./validateWord";

export function useEvaluatePlay() {
  const tileGrid = useAppSelector((state) => state.tileGrid);
  const playGrid = useAppSelector((state) => state.playGrid);
  const turnNumber = useAppSelector((state) => state.gameState.turnNumber);

  const dispatch = useAppDispatch();

  return  async () => {
    if (!validatePlacement(playGrid, tileGrid, turnNumber)) {
      console.log("Invalid play");
      dispatch(gameStateSlice.actions.setTurnState("invalid"));
      dispatch(invalidWordsSlice.actions.reset());
      dispatch(wordScoresSlice.actions.reset());
      return;
    }

    // Determine row in which tiles were played during current turn, assuming that a horizontal play was made
    const playedRow = getPlayedRow(playGrid);
    // Determine column in which tiles were played during current turn, assuming that a vertical play was made
    const playedColumn = getPlayedColumn(playGrid);

    const wordScores =
      playedRow != -1
        ? scoreHorizontalPlay(tileGrid, playGrid, boardGrid, playedRow)
        : scoreVerticalPlay(tileGrid, playGrid, boardGrid, playedColumn);


    dispatch(invalidWordsSlice.actions.reset());
    let hasInvalidWord = false;
    for (const wordScore of wordScores) {
      const wordIsValid = await validateWord(wordScore.word)
      if (!wordIsValid) {
        dispatch(invalidWordsSlice.actions.addWord(wordScore.word));
        dispatch(gameStateSlice.actions.setTurnState("invalid"));
        dispatch(wordScoresSlice.actions.reset());
        hasInvalidWord = true;
      }
    }
    if (hasInvalidWord) {
      return;
    }

    // Update scores for words played during current turn
    dispatch(wordScoresSlice.actions.set(wordScores));

    dispatch(gameStateSlice.actions.setTurnState("valid"));

    return;
  };
}
