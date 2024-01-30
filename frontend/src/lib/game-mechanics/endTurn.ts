import { playGridSlice } from "../../redux-config/slices/playGrid";
import { tileGridSlice } from "../../redux-config/slices/tileGrid";
import { useAppDispatch, useAppSelector } from "../../redux-config/store";
import { BoardValue, boardGrid } from "../game-constants/board";
import { tilePoints as tileBasePoints } from "../game-constants/tiles";
import { getPlayedColumn, getPlayedRow, validateTilePlacement } from "./evaluatePlay";

export const useEndTurn = () => {
  const tileGrid = useAppSelector(state => state.tileGrid)
  const playGrid = useAppSelector((state) => state.playGrid);

  const dispatch = useAppDispatch();

  return (): boolean => {
    if (!validateTilePlacement(playGrid)) {
      return false
    }

    // Determine row in which tiles were played during current turn, assuming that a horizontal play was made
    const playedRow = getPlayedRow(playGrid)
    // DEtermine column in which tiles were played during current turn, assuming that a vertical play was made
    const playedColumn = getPlayedColumn(playGrid)
    
    // TODO: Check that all words formed are valid

    // TODO: Check that all tiles are connected. Use depth first search?

    let score = 0;
    // Calculate score for horizontal play
    if (playedRow != -1) {
      score = calculateHorizontalPlayScore(tileGrid, playGrid, boardGrid, playedRow)
    // Calculate score for vertical play
    } else {
      score = calculateVerticalPlayScore(tileGrid, playGrid, boardGrid, playedColumn)
    }
    
    // Confirm placement of tiles into tileGrid. They will now be fixed.
    dispatch(tileGridSlice.actions.placeTiles(playGrid));
    // Clear the playGrid to prepare for next turn
    dispatch(playGridSlice.actions.clear());
    return true;
  };
};

// Calculate score for a horizontal play
function calculateHorizontalPlayScore(tileGrid: string[][], playGrid: string[][], boardGrid: BoardValue[][], playedRow: number) {
  let score = 0
  return  score
}

// Calculate score for a vertical play
function calculateVerticalPlayScore(tileGrid: string[][], playGrid: string[][], boardGrid: BoardValue[][], playedColumn: number) {
  let score = 0
  return score
}

// Calculate the total points obtained from the current play
function calculatePoints(tileGrid: string[][], playGrid: string[][], boardGrid: BoardValue[][]) {
  let totalPoints = 0
  let wordMultiplier = 1;

  for (let i = 0; i < playGrid.length; i++) {
    for (let j = 0; j < playGrid.length; j++) {
      if (!playGrid[i][j]) continue; // only consider played tiles

      const letter = playGrid[i][j]
      let tilePoints = tileBasePoints[letter]
      
      const boardValue = boardGrid[i][j]

      switch (boardValue) {
        case '2L':
          tilePoints *= 2
          break
        case '3L':
          tilePoints *= 3
          break
        case '2W':
          wordMultiplier *= 2
          break
        case '3W':
          wordMultiplier *= 3
      }

      totalPoints += tilePoints
    }
  }

  return totalPoints * wordMultiplier
}

