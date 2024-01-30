import { BoardValue } from "../game-constants/board";
import { tilePoints as tileBasePoints } from "../game-constants/tiles";

// Calculate the total score of a vertical play
// A vertical play is defined as a play in which all played tiles are placed in a single column
export function scoreVerticalPlay(
  tileGrid: string[][],
  playGrid: string[][],
  boardGrid: BoardValue[][],
  playedColumn: number
) {
  const score =
    scoreVerticalWord(tileGrid, playGrid, boardGrid, playedColumn) +
    scoreHorizontalWords(tileGrid, playGrid, boardGrid, playedColumn);
  return score;
}

function scoreHorizontalWords(
  tileGrid: string[][],
  playGrid: string[][],
  boardGrid: BoardValue[][],
  playedColumn: number
) {
  let score = 0;
  return score;
}

// Calculate the score only for the vertical word formed during the current vertical play
// I am assuming that only 1 vertical word can be formed in a vertical play. This may be proven wrong.
function scoreVerticalWord(
  tileGrid: string[][],
  playGrid: string[][],
  boardGrid: BoardValue[][],
  playedColumn: number
) {
  let score = 0;
  let wordMultiplier = 1;

  // Row indices of played tiles
  const playedRowIndices = [];
  // Add points for played tiles only, while recording their row indices
  for (let row = 0; row < playGrid.length; row++) {
    const playedLetter = playGrid[row][playedColumn];
    // Multiply base tilePoints with bonus value offered by boardGrid
    // Multiply base tilePoints with bonus value offerded by boardGrid
    if (playedLetter) {
      let tilePoints = tileBasePoints[playedLetter];
      const boardValue = boardGrid[row][playedColumn];
      switch (boardValue) {
        case "2L":
          tilePoints *= 2;
          break;
        case "3L":
          tilePoints *= 3;
          break;
        case "2W":
          wordMultiplier *= 2;
          break;
        case "3W":
          wordMultiplier *= 3;
      }
      score += tilePoints;
      playedRowIndices.push(row);
    }
  }

  // Row index of topmost row where a tile was played
  const topPlayedRow = playedRowIndices[0];
  // Row index of bottommost row where a tile was played
  const bottomPlayedRow = playedRowIndices[playedRowIndices.length - 1];

  // Add points for all adjacent fixed tiles below the bottom played tile
  for (let row = bottomPlayedRow; row < tileGrid.length; row++) {
    const letter = tileGrid[row][playedColumn];
    // If any tile has been fixed in this cell, add base points for this tile
    if (letter) {
      score += tileBasePoints[letter];
    } else {
      // If there are no more adjacent tiles below, stop adding points
      break;
    }
  }

  // Add points for all fixed tiles between the topmost and bottommost played tiles
  for (let row = topPlayedRow; row <= bottomPlayedRow; row++) {
    const letter = tileGrid[row][playedColumn];
    if (letter) {
      score += tileBasePoints[letter];
    }
  }

  // Add points for all adjacent tiles
  for (let row = topPlayedRow - 1; row >= 0; row--) {
    const letter = tileGrid[row][playedColumn];
    if (letter) {
      score += tileBasePoints[letter];
    } else {
      // If there are no more adjacent tiles above, stop adding points
      break;
    }
  }

  return score * wordMultiplier;
}
