import { playGridSlice } from "../../redux-config/slices/playGrid";
import { tileGridSlice } from "../../redux-config/slices/tileGrid";
import { useAppDispatch, useAppSelector } from "../../redux-config/store";
import { boardGrid } from "../game-constants/board";
import {
  getPlayedColumn,
  getPlayedRow,
  validateTilePlacement,
} from "./evaluatePlay";
import { scoreHorizontalPlay } from "./scoreHorizontalPlay";
import { scoreVerticalPlay } from "./scoreVerticalPlay";

export const useEndTurn = () => {
  const tileGrid = useAppSelector((state) => state.tileGrid);
  const playGrid = useAppSelector((state) => state.playGrid);

  const dispatch = useAppDispatch();

  return (): boolean => {
    if (!validateTilePlacement(playGrid, tileGrid)) {
      return false;
    }

    // Determine row in which tiles were played during current turn, assuming that a horizontal play was made
    const playedRow = getPlayedRow(playGrid);
    // Determine column in which tiles were played during current turn, assuming that a vertical play was made
    const playedColumn = getPlayedColumn(playGrid);

    // TODO: Check that all words formed are valid

    // TODO: Check that all tiles are connected. Use depth first search?

    // TODO: Check that a single connected word is formed from played tiles

    let score = 0;
    // Calculate score for horizontal play
    if (playedRow != -1) {
      score = scoreHorizontalPlay(
        tileGrid,
        playGrid,
        boardGrid,
        playedRow
      );
      // Calculate score for vertical play
    } else {
      score = scoreVerticalPlay(
        tileGrid,
        playGrid,
        boardGrid,
        playedColumn
      );
    }
    console.log('score:', score)

    // Confirm placement of tiles into tileGrid. They will now be fixed.
    dispatch(tileGridSlice.actions.placeTiles(playGrid));
    // Clear the playGrid to prepare for next turn
    dispatch(playGridSlice.actions.clear());
    return true;
  };
};
