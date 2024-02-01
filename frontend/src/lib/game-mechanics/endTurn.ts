import { playGridSlice } from "../../redux-config/slices/playGrid";
import { tileGridSlice } from "../../redux-config/slices/tileGrid";
import { useAppDispatch, useAppSelector } from "../../redux-config/store";
import { boardGrid } from "../game-constants/board";
import { scoreHorizontalPlay } from "./scoreHorizontalPlay";
import { scoreVerticalPlay } from "./scoreVerticalPlay";
import { getPlayedColumn, getPlayedRow, validatePlay } from "./validatePlay";

export const useEndTurn = () => {
  const tileGrid = useAppSelector((state) => state.tileGrid);
  const playGrid = useAppSelector((state) => state.playGrid);

  const dispatch = useAppDispatch();

  return (): boolean => {
    if (!validatePlay(playGrid, tileGrid)) {
      console.log("Invalid play");
      return false;
    }

    // Determine row in which tiles were played during current turn, assuming that a horizontal play was made
    const playedRow = getPlayedRow(playGrid);
    // Determine column in which tiles were played during current turn, assuming that a vertical play was made
    const playedColumn = getPlayedColumn(playGrid);

    // TODO: Check that all words formed are valid

    // TODO: For the first play, check that 1 of the tiles is played on the centre square

    let wordScores: {word: string, score: number}[];
    // Calculate score for horizontal play
    if (playedRow != -1) {
      wordScores = scoreHorizontalPlay(
        tileGrid,
        playGrid,
        boardGrid,
        playedRow
      );
      // Calculate score for vertical play
    } else {
      wordScores = scoreVerticalPlay(
        tileGrid,
        playGrid,
        boardGrid,
        playedColumn
      );
    }

    console.log(wordScores);
    console.log('Invalid words:')
    for (const wordScore of wordScores) {
      if (wordScore.score === -1) {
        console.log(wordScore.word)
      }
    }

    // Confirm placement of tiles onto tileGrid. They will now be fixed.
    dispatch(tileGridSlice.actions.placeTiles(playGrid));
    // Clear the playGrid to prepare for next turn
    dispatch(playGridSlice.actions.clear());
    return true;
  };
};
